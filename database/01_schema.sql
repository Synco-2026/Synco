

create database if not exists synco
    character set utf8mb4;   -- permite añadir emjis tildes y ñ sin problemas
use synco;

-- Empresas clientes (RF-10). Cada empresa tiene sus propios usuarios y aspirantes.
create table empresas (
    id bigint not null auto_increment primary key,
    nombre varchar(150) not null,
    nit varchar(20) not null unique,
    activa boolean not null default true, -- el SuperAdmin puede suspenderla
    creado_en datetime not null default current_timestamp,
    actualizado_en datetime not null default current_timestamp on update current_timestamp
) engine=innodb; -- define que motor va gestionar la tabla. InnoDB permite transacciones y llaves foráneas

-- Usuarios que entran por la pantalla de login (analistas, admins, superadmin)
-- Los aspirantes no son usuarios, entran con un enlace temporals
create table usuarios (
    id bigint not null auto_increment primary key,
    empresa_id bigint null, -- NULL solo para el superadmin
    nombre varchar(150) not null,
    correo varchar(255) not null unique, -- "Correo corporativo"
    password_hash varchar(255) not null, -- NUNCA la contraseña en texto plano
    rol varchar(20) not null
        check (rol in ('analista', 'admin_empresa', 'superadmin')),
    doble_factor_activo boolean not null default true, -- "Validación 2FA Activa"
    secreto_2fa varchar(255) null, -- semilla del Authenticator
    intentos_fallidos smallint not null default 0,
    bloqueado boolean not null default false,
    bloqueado_en datetime null,
    ultimo_login datetime null,
    activo boolean not null default true,
    creado_en datetime not null default current_timestamp,
    actualizado_en datetime not null default current_timestamp on update current_timestamp,
    foreign key (empresa_id) references empresas(id),
    check (correo collate utf8mb4_bin = lower(correo)), -- siempre en minúscula
    check ((rol = 'superadmin') = (empresa_id is null)) -- superadmin sin empresa; los demás con empresa
) engine=innodb;

-- Historial de cada intento de login sea exitoso o fallido
create table registro_accesos (
    id bigint not null auto_increment primary key,
    usuario_id bigint null, -- NULL si el correo no existe
    correo_ingresado varchar(255) not null,
    exitoso boolean not null,
    ip varchar(45) null, -- cabe IPv4 e IPv6
    creado_en datetime not null default current_timestamp,
    foreign key (usuario_id) references usuarios(id) on delete set null
) engine=innodb;

-- Alertas para el SOC (se llenan solas cuando un usuario se bloquea) El backend las consulta
create table alertas_seguridad (
    id bigint not null auto_increment primary key,
    usuario_id bigint null, -- NULL cuando el correo ingresado no existe
    correo varchar(255) not null,
    ip varchar(45) null,
    motivo varchar(200) not null,
    atendida boolean not null default false, -- el backend la marca al notificar
    creado_en datetime not null default current_timestamp,
    foreign key (usuario_id) references usuarios(id)
) engine=innodb;

-- Sesiones activas "Recordar estación de trabajo" = 12 horas
create table sesiones (
    id char(36) not null default (uuid()) primary key,
    usuario_id bigint not null,
    recordar_estacion boolean not null default false,
    ip varchar(45) null,
    creada_en datetime not null default current_timestamp,
    expira_en datetime not null, -- lo calcula un trigger si no se envía
    foreign key (usuario_id) references usuarios(id) on delete cascade
) engine=innodb;

-- Perfiles de cargo / vacantes: "Mesero", "Logístico"... (RF-09)
create table cargos (
    id bigint not null auto_increment primary key,
    empresa_id bigint not null,
    nombre varchar(100) not null,
    unique (empresa_id, nombre),
    foreign key (empresa_id) references empresas(id)
) engine=innodb;

-- Catálogo de documentos que se pueden pedir: "Cédula", "Certificado EPS"...
create table tipos_documento (
    id bigint not null auto_increment primary key,
    nombre varchar(100) not null unique
) engine=innodb;

-- Qué documentos pide cada cargo y si son obligatorios u opcionales (RF-09, HU-09)
create table requisitos_cargo (
    cargo_id bigint not null,
    tipo_documento_id bigint not null,
    obligatorio boolean not null default true,
    primary key (cargo_id, tipo_documento_id),
    foreign key (cargo_id) references cargos(id) on delete cascade,
    foreign key (tipo_documento_id) references tipos_documento(id)
) engine=innodb;

-- Aspirantes / candidatos (HU-12, HU-11, RF-08)
-- Los crea siempre un usuario de RRHH. El aspirante no tiene cuenta: entra solo con su enlace.
create table aspirantes (
    id bigint not null auto_increment primary key,
    empresa_id bigint not null,
    cargo_id bigint not null,
    tipo_documento varchar(5) not null check (tipo_documento in ('CC','CE','TI','PPT','PAS')),
    numero_documento varchar(20) not null,
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    telefono varchar(15) not null check (telefono regexp '^[0-9]+$'), -- solo números
    correo varchar(255) null,
    estado varchar(15) not null default 'pendiente'
        check (estado in ('pendiente','en_revision','aprobado','rechazado')),
    acepta_habeas_data boolean not null default false, -- Ley 1581
    fecha_habeas_data datetime null,
    creado_por bigint not null, -- usuario de RRHH que creó el perfil
    creado_en datetime not null default current_timestamp,
    actualizado_en datetime not null default current_timestamp on update current_timestamp,
    unique (empresa_id, numero_documento),
    foreign key (empresa_id) references empresas(id),
    foreign key (cargo_id) references cargos(id),
    foreign key (creado_por) references usuarios(id)
) engine=innodb;

-- Enlaces temporales con token único para que el aspirante suba sus documentos (RF-01, HU-01)
create table enlaces_acceso (
    id bigint not null auto_increment primary key,
    aspirante_id bigint not null,
    token char(36) not null unique default (uuid()),
    expira_en datetime not null,
    usado boolean not null default false,
    creado_por bigint not null, -- usuario de RRHH que generó el enlace
    creado_en datetime not null default current_timestamp,
    foreign key (aspirante_id) references aspirantes(id) on delete cascade,
    foreign key (creado_por) references usuarios(id)
) engine=innodb;

-- Documentos subidos por el aspirante (RF-02 a RF-07)
-- Solo se guarda la ruta de los archivos; los archivos viven en el servidor/disco, no en la BD.
create table documentos (
    id bigint not null auto_increment primary key,
    aspirante_id bigint not null,
    tipo_documento_id bigint not null,
    ruta_original varchar(500) not null, -- foto tal como la subió el aspirante
    ruta_pdf varchar(500) null, -- PDF generado por el motor (NULL mientras se procesa)
    estado varchar(15) not null default 'pendiente'
        check (estado in ('pendiente','en_revision','aprobado','rechazado')),
    calidad_deficiente boolean not null default false, -- marcado por el motor (CU_03)
    motivo_rechazo text null,
    revisado_por bigint null,
    revisado_en datetime null,
    creado_en datetime not null default current_timestamp,
    actualizado_en datetime not null default current_timestamp on update current_timestamp,
    unique (aspirante_id, tipo_documento_id), -- un documento por tipo; si lo corrige, se actualiza
    foreign key (aspirante_id) references aspirantes(id) on delete cascade,
    foreign key (tipo_documento_id) references tipos_documento(id),
    foreign key (revisado_por) references usuarios(id)
) engine=innodb;

-- Auditoría inalterable: quién hizo qué y cuándo (HU-16)
-- (sin llaves foráneas a propósito: el historial nunca debe depender de otras tablas)
create table auditoria (
    id bigint not null auto_increment primary key,
    usuario_id bigint null,
    tabla varchar(50) not null,
    registro_id bigint null,
    accion varchar(30) not null, -- INSERT / UPDATE / DELETE / BLOQUEO_USUARIO
    datos_antes json null,
    datos_despues json null,
    creado_en datetime not null default current_timestamp
) engine=innodb;


-- 2. ÍNDICES (solo los que aceleran las búsquedas más frecuentes)
--    (MySQL ya crea índices solo para PRIMARY KEY, UNIQUE y llaves foráneas)

create index idx_aspirantes_empresa_estado on aspirantes (empresa_id, estado); -- filtro del dashboard (HU-14)
create index idx_aspirantes_documento on aspirantes (numero_documento); -- búsqueda por cédula
create index idx_accesos_correo_fecha on registro_accesos (correo_ingresado, creado_en);
create index idx_auditoria_tabla_registro on auditoria (tabla, registro_id);


-- 3. VISTA: progreso de carga de cada aspirante (HU-05, HU-13)

create view v_progreso_aspirantes as
select
    a.id as aspirante_id,
    a.empresa_id,
    a.numero_documento,
    concat(a.nombres, ' ', a.apellidos) as nombre_completo,
    a.estado,
    count(r.tipo_documento_id) as documentos_requeridos,
    count(d.id) as documentos_subidos,
    count(case when d.estado = 'aprobado' then 1 end) as documentos_aprobados,
    case when count(r.tipo_documento_id) = 0 then 0
         else round(100.0 * count(d.id) / count(r.tipo_documento_id))
    end as porcentaje_carga
from aspirantes a
left join requisitos_cargo r on r.cargo_id = a.cargo_id and r.obligatorio
left join documentos d on d.aspirante_id = a.id
                            and d.tipo_documento_id = r.tipo_documento_id
group by a.id;

-- 4. TRIGGERS Y PROCEDIMIENTO
--    (DELIMITER $$ le dice a MySQL que el ";" de adentro no termina la instrucción)
--
--    NOTA: la actualización automática de "actualizado_en" NO necesita trigger en MySQL:
--    ya la hace la propia columna con "ON UPDATE CURRENT_TIMESTAMP".

delimiter $$


-- TRIGGER 2: política de seguridad del login (imagen: "bloqueo automático
-- y notificación al SOC tras 3 intentos fallidos")
--   * Correo existente, intento exitoso -> reinicia el contador y guarda el último login.
--   * Correo existente, intento fallido -> suma 1; al llegar a 3 bloquea al usuario,
--     deja rastro en auditoría y crea una alerta en alertas_seguridad.
--   * Correo que NO existe, intento fallido -> si se repite 3 veces con ese mismo correo
--     en 15 minutos, crea una alerta en alertas_seguridad (posible ataque de adivinanza).

create trigger trg_procesar_acceso after insert on registro_accesos
for each row
begin
    declare v_intentos smallint;
    declare v_repetidos int;

    if new.usuario_id is not null then
        if new.exitoso then
            update usuarios
               set intentos_fallidos = 0,
                   ultimo_login = new.creado_en
             where id = new.usuario_id;
        else
            update usuarios
               set intentos_fallidos = intentos_fallidos + 1
             where id = new.usuario_id;

            select intentos_fallidos into v_intentos from usuarios where id = new.usuario_id;

            if v_intentos >= 3 then
                update usuarios
                   set bloqueado = true, bloqueado_en = now()
                 where id = new.usuario_id and bloqueado = false;

                if row_count() > 0 then -- solo la primera vez que se bloquea
                    insert into auditoria (usuario_id, tabla, registro_id, accion, datos_despues)
                    values (new.usuario_id, 'usuarios', new.usuario_id, 'BLOQUEO_USUARIO',
                            json_object('correo', new.correo_ingresado, 'ip', new.ip));

                    insert into alertas_seguridad (usuario_id, correo, ip, motivo)
                    values (new.usuario_id, new.correo_ingresado, new.ip, '3 intentos fallidos');
                end if;
            end if;
        end if;
    elseif new.exitoso = false then -- el correo no existe en la base
        select count(*) into v_repetidos
          from registro_accesos
         where usuario_id is null
           and correo_ingresado = new.correo_ingresado
           and exitoso = false
           and creado_en >= now() - interval 15 minute;

        if v_repetidos = 3 then -- solo en el 3.er intento, para no repetir la alerta
            insert into alertas_seguridad (usuario_id, correo, ip, motivo)
            values (null, new.correo_ingresado, new.ip, 'correo inexistente: 3 intentos fallidos');
        end if;
    end if;
end$$


-- PROCEDIMIENTO: registrar el resultado de un intento de login
--   El backend compara la contraseña con bcrypt (MySQL no sabe hacerlo) y luego
--   llama a este procedimiento con el resultado. Este procedimiento decide la respuesta:
--     'ok'                    -> correo y credenciales correctos
--     'credenciales_invalidas'-> correo inexistente O contraseña/código incorrecto
--                                (el mensaje es el MISMO en ambos casos, a propósito)
--     'usuario_bloqueado'     -> la cuenta está bloqueada (por 3 intentos fallidos)
--   p_exitoso debe ser true SOLO si contraseña Y código 2FA fueron correctos.

create procedure sp_registrar_intento_login(
    in p_correo varchar(255),
    in p_exitoso boolean,
    in p_ip varchar(45)
)
begin
    declare v_correo varchar(255);
    declare v_usuario_id bigint;
    declare v_bloqueado boolean;
    declare v_activo boolean;

    set v_correo = lower(trim(p_correo));
    set v_usuario_id = (select id from usuarios where correo = v_correo);
    set v_bloqueado = coalesce((select bloqueado from usuarios where id = v_usuario_id), false);
    set v_activo = coalesce((select activo from usuarios where id = v_usuario_id), false);

    if v_usuario_id is null then
        -- el correo no existe: se guarda el intento y se responde igual que con una clave mala
        insert into registro_accesos (usuario_id, correo_ingresado, exitoso, ip)
        values (null, v_correo, false, p_ip);
        select 'credenciales_invalidas' as resultado;

    elseif v_bloqueado then
        -- cuenta ya bloqueada: no se acepta el ingreso aunque la clave sea correcta
        select 'usuario_bloqueado' as resultado;

    elseif not v_activo then
        -- cuenta desactivada: nunca entra
        insert into registro_accesos (usuario_id, correo_ingresado, exitoso, ip)
        values (v_usuario_id, v_correo, false, p_ip);
        select 'credenciales_invalidas' as resultado;

    else
        insert into registro_accesos (usuario_id, correo_ingresado, exitoso, ip)
        values (v_usuario_id, v_correo, p_exitoso, p_ip);

        if p_exitoso then
            select 'ok' as resultado;
        elseif (select bloqueado from usuarios where id = v_usuario_id) then
            select 'usuario_bloqueado' as resultado; -- este fue el 3.er intento fallido
        else
            select 'credenciales_invalidas' as resultado;
        end if;
    end if;
end$$


-- TRIGGER 3: vigencia de la sesión
--   "Recordar estación de trabajo" marcado -> 12 horas
--   Sin marcar                             -> 15 minutos (HU-04)

create trigger trg_expiracion_sesion before insert on sesiones
for each row
begin
    if new.expira_en is null then
        if new.recordar_estacion then
            set new.expira_en = now() + interval 12 hour;
        else
            set new.expira_en = now() + interval 15 minute;
        end if;
    end if;
end$$


-- TRIGGER 4: reglas al SUBIR un documento
--   * Habeas Data (HU-11, Ley 1581): el aspirante debe haber aceptado la política.
--   * Un documento recién subido no puede nacer aprobado ni rechazado.

create trigger trg_validar_documento_nuevo before insert on documentos
for each row
begin
    if not exists (select 1 from aspirantes
                    where id = new.aspirante_id and acepta_habeas_data = true) then
        signal sqlstate '45000'
            set message_text = 'El aspirante debe aceptar la política de tratamiento de datos (Ley 1581) antes de subir documentos';
    end if;

    if new.estado not in ('pendiente', 'en_revision') then
        signal sqlstate '45000'
            set message_text = 'Un documento nuevo solo puede iniciar en estado pendiente o en_revision';
    end if;
end$$


-- TRIGGER 5: reglas de revisión de un documento (HU-06)
--   * Rechazar exige un motivo.
--   * Aprobar o rechazar exige indicar quién revisó; se guarda la fecha.
--   * Si el documento vuelve a "pendiente"/"en_revision" (el aspirante lo
--     corrigió) se limpian motivo y revisor.

create trigger trg_validar_revision before update on documentos
for each row
begin
    if new.estado in ('aprobado', 'rechazado') then
        if new.revisado_por is null then
            signal sqlstate '45000'
                set message_text = 'Debe indicar el usuario (revisado_por) que aprueba o rechaza el documento';
        end if;
        if new.estado = 'rechazado' and (new.motivo_rechazo is null or trim(new.motivo_rechazo) = '') then
            signal sqlstate '45000'
                set message_text = 'Debe escribir el motivo del rechazo del documento';
        end if;
        if old.estado <> new.estado then
            set new.revisado_en = now();
        end if;
        if new.estado = 'aprobado' then
            set new.motivo_rechazo = null;
        end if;
    else
        set new.motivo_rechazo = null;
        set new.revisado_por = null;
        set new.revisado_en = null;
    end if;
end$$


-- TRIGGER 6: el estado del aspirante se calcula solo a partir de sus documentos
--   Prioridad:  rechazado  >  aprobado (todos los obligatorios aprobados)
--               >  en_revision  >  pendiente
--   MySQL no permite un trigger para INSERT y UPDATE a la vez, así que la lógica
--   vive en un procedimiento y los dos triggers lo llaman.

create procedure sp_recalcular_estado_aspirante(in p_aspirante_id bigint)
begin
    declare v_requeridos int default 0;
    declare v_aprobados int default 0;
    declare v_rechazados int default 0;
    declare v_en_revision int default 0;
    declare v_nuevo varchar(15);

    select count(*) into v_requeridos
      from requisitos_cargo r
      join aspirantes a on a.cargo_id = r.cargo_id
     where a.id = p_aspirante_id and r.obligatorio = true;

    select count(*) into v_aprobados
      from documentos d
      join aspirantes a on a.id = d.aspirante_id
      join requisitos_cargo r on r.cargo_id = a.cargo_id
                             and r.tipo_documento_id = d.tipo_documento_id
                             and r.obligatorio = true
     where d.aspirante_id = p_aspirante_id and d.estado = 'aprobado';

    select coalesce(sum(estado = 'rechazado'), 0),
           coalesce(sum(estado = 'en_revision'), 0)
      into v_rechazados, v_en_revision
      from documentos
     where aspirante_id = p_aspirante_id;

    set v_nuevo = case
        when v_rechazados > 0 then 'rechazado'
        when v_requeridos > 0 and v_aprobados >= v_requeridos then 'aprobado'
        when v_en_revision > 0 then 'en_revision'
        else 'pendiente'
    end;

    update aspirantes
       set estado = v_nuevo
     where id = p_aspirante_id and estado <> v_nuevo;
end$$

create trigger trg_estado_aspirante_ins after insert on documentos
for each row
begin
    call sp_recalcular_estado_aspirante(new.aspirante_id);
end$$

create trigger trg_estado_aspirante_upd after update on documentos
for each row
begin
    call sp_recalcular_estado_aspirante(new.aspirante_id);
end$$


-- TRIGGER 7: auditoría automática de aspirantes y documentos (HU-16)
--   El backend indica quién actúa con:   SET @usuario_id = 5;
--   (uno por cada acción: INSERT, UPDATE y DELETE, porque MySQL no permite mezclarlas)

create trigger trg_auditar_aspirantes_ins after insert on aspirantes
for each row
begin
    insert into auditoria (usuario_id, tabla, registro_id, accion, datos_despues)
    values (@usuario_id, 'aspirantes', new.id, 'INSERT',
            json_object('id', new.id, 'empresa_id', new.empresa_id, 'cargo_id', new.cargo_id, 'tipo_documento', new.tipo_documento, 'numero_documento', new.numero_documento, 'nombres', new.nombres, 'apellidos', new.apellidos, 'telefono', new.telefono, 'correo', new.correo, 'estado', new.estado, 'acepta_habeas_data', new.acepta_habeas_data, 'fecha_habeas_data', new.fecha_habeas_data, 'creado_por', new.creado_por, 'creado_en', new.creado_en, 'actualizado_en', new.actualizado_en));
end$$

create trigger trg_auditar_aspirantes_upd after update on aspirantes
for each row
begin
    insert into auditoria (usuario_id, tabla, registro_id, accion, datos_antes, datos_despues)
    values (@usuario_id, 'aspirantes', new.id, 'UPDATE',
            json_object('id', old.id, 'empresa_id', old.empresa_id, 'cargo_id', old.cargo_id, 'tipo_documento', old.tipo_documento, 'numero_documento', old.numero_documento, 'nombres', old.nombres, 'apellidos', old.apellidos, 'telefono', old.telefono, 'correo', old.correo, 'estado', old.estado, 'acepta_habeas_data', old.acepta_habeas_data, 'fecha_habeas_data', old.fecha_habeas_data, 'creado_por', old.creado_por, 'creado_en', old.creado_en, 'actualizado_en', old.actualizado_en),
            json_object('id', new.id, 'empresa_id', new.empresa_id, 'cargo_id', new.cargo_id, 'tipo_documento', new.tipo_documento, 'numero_documento', new.numero_documento, 'nombres', new.nombres, 'apellidos', new.apellidos, 'telefono', new.telefono, 'correo', new.correo, 'estado', new.estado, 'acepta_habeas_data', new.acepta_habeas_data, 'fecha_habeas_data', new.fecha_habeas_data, 'creado_por', new.creado_por, 'creado_en', new.creado_en, 'actualizado_en', new.actualizado_en));
end$$

create trigger trg_auditar_aspirantes_del after delete on aspirantes
for each row
begin
    insert into auditoria (usuario_id, tabla, registro_id, accion, datos_antes)
    values (@usuario_id, 'aspirantes', old.id, 'DELETE',
            json_object('id', old.id, 'empresa_id', old.empresa_id, 'cargo_id', old.cargo_id, 'tipo_documento', old.tipo_documento, 'numero_documento', old.numero_documento, 'nombres', old.nombres, 'apellidos', old.apellidos, 'telefono', old.telefono, 'correo', old.correo, 'estado', old.estado, 'acepta_habeas_data', old.acepta_habeas_data, 'fecha_habeas_data', old.fecha_habeas_data, 'creado_por', old.creado_por, 'creado_en', old.creado_en, 'actualizado_en', old.actualizado_en));
end$$

create trigger trg_auditar_documentos_ins after insert on documentos
for each row
begin
    insert into auditoria (usuario_id, tabla, registro_id, accion, datos_despues)
    values (@usuario_id, 'documentos', new.id, 'INSERT',
            json_object('id', new.id, 'aspirante_id', new.aspirante_id, 'tipo_documento_id', new.tipo_documento_id, 'ruta_original', new.ruta_original, 'ruta_pdf', new.ruta_pdf, 'estado', new.estado, 'calidad_deficiente', new.calidad_deficiente, 'motivo_rechazo', new.motivo_rechazo, 'revisado_por', new.revisado_por, 'revisado_en', new.revisado_en, 'creado_en', new.creado_en, 'actualizado_en', new.actualizado_en));
end$$

create trigger trg_auditar_documentos_upd after update on documentos
for each row
begin
    insert into auditoria (usuario_id, tabla, registro_id, accion, datos_antes, datos_despues)
    values (@usuario_id, 'documentos', new.id, 'UPDATE',
            json_object('id', old.id, 'aspirante_id', old.aspirante_id, 'tipo_documento_id', old.tipo_documento_id, 'ruta_original', old.ruta_original, 'ruta_pdf', old.ruta_pdf, 'estado', old.estado, 'calidad_deficiente', old.calidad_deficiente, 'motivo_rechazo', old.motivo_rechazo, 'revisado_por', old.revisado_por, 'revisado_en', old.revisado_en, 'creado_en', old.creado_en, 'actualizado_en', old.actualizado_en),
            json_object('id', new.id, 'aspirante_id', new.aspirante_id, 'tipo_documento_id', new.tipo_documento_id, 'ruta_original', new.ruta_original, 'ruta_pdf', new.ruta_pdf, 'estado', new.estado, 'calidad_deficiente', new.calidad_deficiente, 'motivo_rechazo', new.motivo_rechazo, 'revisado_por', new.revisado_por, 'revisado_en', new.revisado_en, 'creado_en', new.creado_en, 'actualizado_en', new.actualizado_en));
end$$

create trigger trg_auditar_documentos_del after delete on documentos
for each row
begin
    insert into auditoria (usuario_id, tabla, registro_id, accion, datos_antes)
    values (@usuario_id, 'documentos', old.id, 'DELETE',
            json_object('id', old.id, 'aspirante_id', old.aspirante_id, 'tipo_documento_id', old.tipo_documento_id, 'ruta_original', old.ruta_original, 'ruta_pdf', old.ruta_pdf, 'estado', old.estado, 'calidad_deficiente', old.calidad_deficiente, 'motivo_rechazo', old.motivo_rechazo, 'revisado_por', old.revisado_por, 'revisado_en', old.revisado_en, 'creado_en', old.creado_en, 'actualizado_en', old.actualizado_en));
end$$


-- TRIGGER 8: la auditoría no se puede editar ni borrar (HU-16)
--   OJO: en MySQL, TRUNCATE no activa triggers. Por eso el usuario del backend
--   NO recibe permisos de borrado sobre esta tabla (ver 03_usuario_backend.sql).

create trigger trg_auditoria_no_update before update on auditoria
for each row
begin
    signal sqlstate '45000'
        set message_text = 'Los registros de auditoría no se pueden modificar ni eliminar';
end$$

create trigger trg_auditoria_no_delete before delete on auditoria
for each row
begin
    signal sqlstate '45000'
        set message_text = 'Los registros de auditoría no se pueden modificar ni eliminar';
end$$


-- TRIGGER 9: solo RRHH de la misma empresa puede crear aspirantes
--   * creado_por debe ser analista o admin_empresa, activo, no bloqueado
--     y de la MISMA empresa del aspirante.
--   * El cargo elegido debe pertenecer a esa misma empresa.

create trigger trg_validar_creacion_aspirante before insert on aspirantes
for each row
begin
    if not exists (select 1 from usuarios
                    where id = new.creado_por
                      and empresa_id = new.empresa_id
                      and rol in ('analista', 'admin_empresa')
                      and activo = true and bloqueado = false) then
        signal sqlstate '45000'
            set message_text = 'Solo un usuario de Recursos Humanos activo de la misma empresa puede crear aspirantes';
    end if;

    if not exists (select 1 from cargos
                    where id = new.cargo_id and empresa_id = new.empresa_id) then
        signal sqlstate '45000'
            set message_text = 'El cargo seleccionado no pertenece a la empresa del aspirante';
    end if;
end$$

delimiter ;