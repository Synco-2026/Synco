-- =====================================================================
--  SynCO - Datos de PRUEBA (solo para desarrollo)
--  Contraseña de todos los usuarios de prueba:  Synco2026*Prueba
-- =====================================================================
use synco;

insert into tipos_documento (nombre) values
    ('Cédula de ciudadanía'),
    ('Certificado EPS'),
    ('Certificado bancario'),
    ('Certificado de estudios'),
    ('Hoja de vida');

insert into empresas (nombre, nit) values ('Eventos Medellín S.A.S.', '900123456-7');

insert into usuarios (empresa_id, nombre, correo, password_hash, rol) values
    (null, 'Super Administrador', 'superadmin@synco.com.co', 'Synco2026*Prueba', 'superadmin'),
    (1, 'Admin Empresa', 'admin@empresa.com.co', 'Synco2026*Prueba', 'admin_empresa'),
    (1, 'Laura Analista', 'analista@empresa.com.co', 'Synco2026*Prueba', 'analista');

insert into cargos (empresa_id, nombre) values (1, 'Mesero'), (1, 'Logístico');

-- Mesero: cédula, EPS y banco obligatorios; estudios opcional
insert into requisitos_cargo (cargo_id, tipo_documento_id, obligatorio) values
    (1, 1, true), (1, 2, true), (1, 3, true), (1, 4, false),
    (2, 1, true), (2, 2, true), (2, 5, false);

insert into aspirantes (empresa_id, cargo_id, tipo_documento, numero_documento, nombres, apellidos,
                        telefono, correo, acepta_habeas_data, fecha_habeas_data, creado_por)
values (1, 1, 'CC', '1000000001', 'Carlos', 'Pérez Gómez', '3001234567', 'carlos@correo.com',
        true, now(), 3);

insert into enlaces_acceso (aspirante_id, expira_en, creado_por)
values (1, now() + interval 3 day, 3);
