# SynCO – Base de datos MySQL

Base de datos de **SynCO (Sincronización Corporativa)**: plataforma para recibir, procesar y validar los documentos precontractuales de aspirantes. Proyecto formativo SENA – C.T.G.I – Ficha 3425723.

Requiere **MySQL 8.0.16 o superior** (probado en 8.0).

## Estructura del repositorio

```
synco-db/
├── database/
│   ├── 01_schema.sql           ← crea la base, tablas, vista, procedimiento y triggers
│   ├── 02_datos_prueba.sql     ← datos de ejemplo (solo desarrollo)
│   └── 03_usuario_backend.sql  ← usuario con permisos limitados para el backend
├── .env.example                ← plantilla de variables de conexión
├── .gitignore
└── README.md
```

## Modelo de datos (12 tablas + 1 vista)

| Tabla | Para qué sirve |
|---|---|
| `empresas` | Empresas clientes de la plataforma. |
| `usuarios` | Quienes entran por el login (RRHH, admins, superadmin): correo, contraseña (hash), rol, 2FA, intentos fallidos y bloqueo. |
| `registro_accesos` | Historial de cada intento de login (bueno o malo). |
| `alertas_seguridad` | Alertas para el SOC; se crean solas cuando un usuario se bloquea o cuando se prueba varias veces un correo que no existe. |
| `sesiones` | Sesiones abiertas; guarda si marcó "Recordar estación de trabajo" y cuándo vence. |
| `cargos` | Perfiles/vacantes ("Mesero", "Logístico"). |
| `tipos_documento` | Catálogo de documentos ("Cédula", "Certificado EPS"…). |
| `requisitos_cargo` | Qué documentos pide cada cargo y si son obligatorios u opcionales. |
| `aspirantes` | Perfil del candidato (lo crea RRHH), su estado y la aceptación de Habeas Data. |
| `enlaces_acceso` | Token único y temporal con el que el aspirante entra (sin contraseña). |
| `documentos` | Cada documento subido: ruta de la foto, ruta del PDF, estado, motivo de rechazo y revisor. |
| `auditoria` | Historial inalterable de acciones (quién, qué, cuándo). |
| `v_progreso_aspirantes` (vista) | Documentos requeridos/subidos/aprobados y % de avance por aspirante. |

**Relación general:** `empresa` → tiene `usuarios`, `cargos` y `aspirantes`. Un `cargo` pide varios `tipos_documento` (`requisitos_cargo`). Un `aspirante` tiene varios `documentos` y recibe `enlaces_acceso`.

### ¿Cómo se relaciona la pantalla de login con la BD?

| Lo que se ve en la pantalla | Dónde se guarda |
|---|---|
| Correo corporativo | `usuarios.correo` |
| Contraseña (mín. 12 caracteres) | `usuarios.password_hash` (hash bcrypt/argon2; la longitud mínima la valida el **backend**) |
| Analista / Administrador | `usuarios.rol` |
| Validación 2FA activa + Authenticator | `usuarios.doble_factor_activo` y `usuarios.secreto_2fa` (el código de 6 dígitos **no se guarda**: el backend lo valida contra el secreto) |
| Recordar estación de trabajo (12 h) | `sesiones.recordar_estacion` + `sesiones.expira_en` |
| Bloqueo tras 3 intentos y aviso al SOC | `usuarios.intentos_fallidos`, `usuarios.bloqueado`, `registro_accesos`, `alertas_seguridad` y el trigger 2 |

## Cómo se valida el login (contraseña y correo)

La base de datos guarda el correo y el **hash** de la contraseña, pero **no compara la contraseña**: eso lo hace el backend con bcrypt, porque MySQL no sabe verificar bcrypt (y no conviene enviarle la contraseña en texto plano, ya que quedaría en sus registros). La base de datos sí se encarga de **decidir qué pasa con cada intento** mediante el procedimiento `sp_registrar_intento_login(correo, exitoso, ip)`.

Flujo del backend:
1. Busca el usuario: `select id, password_hash, activo from usuarios where correo = ?`
2. Compara la contraseña con `bcrypt` (y valida el código 2FA).
3. Llama a `sp_registrar_intento_login` con el resultado (`exitoso` = true solo si contraseña **y** 2FA son correctos).
4. Según la respuesta, muestra la pantalla o la alerta.

| Situación | Resultado del procedimiento |
|---|---|
| Correo correcto + contraseña incorrecta | `credenciales_invalidas` |
| Correo que no existe (con cualquier contraseña) | `credenciales_invalidas` |
| Correo y contraseña correctos pero código 2FA incorrecto | `credenciales_invalidas` |
| Todo correcto | `ok` |
| Cuenta bloqueada (3 intentos fallidos) | `usuario_bloqueado` |

**Por qué el mensaje es igual cuando el correo no existe y cuando la contraseña es mala:** si la pantalla dijera "ese correo no existe", un atacante podría descubrir qué correos están registrados. Por eso el mensaje al usuario debe ser único: *"Correo o contraseña incorrectos"*. Además, una contraseña no se puede evaluar sola: solo tiene sentido frente al hash de un usuario concreto, así que con un correo inexistente el intento siempre falla.

Ejemplo en Node.js (`npm install bcryptjs mysql2`):
```js
const bcrypt = require('bcryptjs');

async function login(correo, clave, ip) {
  correo = correo.toLowerCase().trim();
  const [filas] = await pool.execute(
    'select id, password_hash, activo from usuarios where correo = ?', [correo]);
  const usuario = filas[0];

  // si no existe, se compara contra un hash falso para tardar lo mismo
  const hash = usuario ? usuario.password_hash : HASH_FALSO;
  const claveOk = await bcrypt.compare(clave, hash);

  const exitoso = Boolean(usuario) && claveOk; // aquí iría también la validación del 2FA
  const [res] = await pool.query('call sp_registrar_intento_login(?, ?, ?)', [correo, exitoso, ip]);
  return res[0][0].resultado; // 'ok' | 'credenciales_invalidas' | 'usuario_bloqueado'
}
```
(`HASH_FALSO` es cualquier hash bcrypt válido que no corresponda a una contraseña real.)

## Cómo entra y se crea un aspirante

1. **RRHH crea el perfil** del aspirante (`aspirantes`, con `creado_por` = el usuario de RRHH) y le asigna un cargo.
2. **RRHH genera el enlace** (`enlaces_acceso`): token único con fecha de vencimiento.
3. **El aspirante entra solo con ese enlace** (sin usuario ni contraseña), acepta Habeas Data y sube sus documentos.
4. El backend debe validar el token: que exista, que no esté vencido (`expira_en`) y que no esté usado (`usado`). Al terminar la carga, debe marcar `usado = true`.

Los aspirantes **no** están en `usuarios`: esa tabla es solo para quienes usan el login.

## Triggers incluidos

| # | Trigger | Qué hace automáticamente |
|---|---|---|
| 1 | *(columna `actualizado_en`)* | MySQL la actualiza solo con `on update current_timestamp`; no hace falta trigger. |
| 2 | `trg_procesar_acceso` | Cuenta intentos fallidos; al 3.º bloquea al usuario, lo registra en auditoría y crea una fila en `alertas_seguridad`. Si el login es exitoso, reinicia el contador. Si el correo **no existe** y se prueba 3 veces en 15 minutos, también crea una alerta. |
| 3 | `trg_expiracion_sesion` | Calcula el vencimiento de la sesión: 12 h si recordó la estación, 15 min si no. |
| 4 | `trg_validar_documento_nuevo` | Impide subir documentos si el aspirante no aceptó Habeas Data (Ley 1581), y que un documento nuevo nazca aprobado o rechazado. |
| 5 | `trg_validar_revision` | Exige motivo al rechazar y revisor al aprobar/rechazar; guarda la fecha de revisión. |
| 6 | `trg_estado_aspirante_ins/upd` | Calculan solo el estado del aspirante: `rechazado` > `aprobado` (todos los obligatorios aprobados) > `en_revision` > `pendiente`. Usan el procedimiento `sp_recalcular_estado_aspirante`. |
| 7 | `trg_auditar_*_ins/upd/del` | Guardan en `auditoria` cada INSERT/UPDATE/DELETE de aspirantes y documentos, con el antes y el después. |
| 8 | `trg_auditoria_no_update/delete` | Bloquean editar o borrar registros de `auditoria`. |
| 9 | `trg_validar_creacion_aspirante` | Solo un usuario de RRHH (analista o admin) activo y de la misma empresa puede crear aspirantes; el cargo debe ser de esa empresa. |

> **Por qué hay varios triggers del mismo tipo:** en MySQL un trigger solo puede escuchar *un* evento (INSERT, UPDATE o DELETE), así que la auditoría y el estado del aspirante se reparten en varios.

## Paso a paso para crear la base de datos

### Requisito
Tener MySQL 8 instalado. Para trabajar de forma visual se recomienda **MySQL Workbench** (descarga gratuita desde mysql.com).

### Opción A: con MySQL Workbench (más visual)
1. Conéctate a tu servidor local (usuario `root`).
2. Menú **File → Open SQL Script…** y elige `01_schema.sql`.
3. Pulsa el rayo ⚡ (**Execute**). Esto crea la base `synco` con todo adentro.
4. Repite con `02_datos_prueba.sql` (opcional) y `03_usuario_backend.sql`.
5. En el panel izquierdo, clic derecho → **Refresh All** y verás las tablas en `synco`.

### Opción B: con la terminal
```bash
mysql -u root -p < database/01_schema.sql
mysql -u root -p < database/02_datos_prueba.sql   # opcional
```

> Los scripts usan `delimiter $$`. Funcionan en la terminal y en MySQL Workbench. Algunas extensiones de VS Code no lo entienden: úsalas solo para **editar**, y ejecuta los scripts desde Workbench o la terminal.

### Crear el usuario del backend
Edita `03_usuario_backend.sql`, cambia `CAMBIA_ESTA_CLAVE` por una clave real (sin subir ese cambio a GitHub) y ejecútalo igual que los anteriores. Este usuario **no puede editar ni borrar la auditoría**.

## Subirlo a GitHub

> En GitHub se suben los **scripts SQL** (la "receta" de la base de datos), no los archivos internos de MySQL. Así cualquier compañero crea la misma base con un par de comandos.

1. Crea un repositorio vacío en https://github.com/new (por ejemplo `synco-db`), sin README ni .gitignore.
2. En la terminal, dentro de la carpeta del proyecto:
```bash
git init
git add .
git commit -m "Base de datos inicial de SynCO"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/synco-db.git
git push -u origin main
```
3. Cuando hagas cambios: `git add .` → `git commit -m "describe el cambio"` → `git push`.

**Importante:** nunca subas `.env`, claves reales ni copias de seguridad con datos de aspirantes (el `.gitignore` ya los excluye).

## Conectarlo al backend

1. Copia `.env.example` a `.env` y escribe tus datos reales.
2. Instala el conector de tu lenguaje:

**Node.js**
```bash
npm install mysql2 dotenv
```
```js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  timezone: '-05:00',          // hora de Colombia
});

const [filas] = await pool.execute('select * from usuarios where correo = ?', [correo]);
```

**Python**
```bash
pip install mysql-connector-python python-dotenv
```
```python
import os, mysql.connector
from dotenv import load_dotenv
load_dotenv()
conn = mysql.connector.connect(
    host=os.environ["DB_HOST"], port=os.environ["DB_PORT"],
    database=os.environ["DB_NAME"], user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
)
cur = conn.cursor(dictionary=True)
cur.execute("select * from usuarios where correo = %s", (correo,))
filas = cur.fetchall()
```

### Detalles que el backend debe respetar
- **Login:** después de comparar la contraseña y el 2FA, llama siempre a `call sp_registrar_intento_login(correo, exitoso, ip)` y usa su respuesta (ver la sección "Cómo se valida el login"). El bloqueo y las alertas ocurren solos.
- **Quién hace la acción (auditoría):** en la **misma conexión** que usará para las consultas de esa petición, ejecuta primero `set @usuario_id = <id del usuario>;`. Si usas un *pool* de conexiones, hazlo en cada petición (la variable se queda en la conexión y podría atribuirse a otra persona).
- **Alertas al SOC:** consulta periódicamente `select * from alertas_seguridad where atendida = false`, envía el aviso y márcalas con `update ... set atendida = true`.
- **Aprobar/rechazar:** envía `estado`, `revisado_por` y, si rechaza, `motivo_rechazo`.
- **Nunca** guardes contraseñas en texto plano: usa bcrypt o argon2.
- **Consultas siempre parametrizadas** (`?`, `%s`), nunca concatenando texto, para evitar inyección SQL.
- **Zona horaria:** MySQL guarda fechas sin zona (`DATETIME`). Usa la misma zona en el servidor de MySQL y en el backend.

## Datos de prueba
Usuarios de `02_datos_prueba.sql` (contraseña `Synco2026*Prueba`): `superadmin@synco.com.co`, `admin@empresa.com.co`, `analista@empresa.com.co`. Solo para desarrollo.
