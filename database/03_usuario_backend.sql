
create user 'synco_app'@'localhost' identified by 'synco2026Prueba';

-- Tablas de trabajo normal: leer, crear, modificar y borrar
grant select, insert, update, delete on synco.empresas to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.usuarios to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.registro_accesos to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.sesiones to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.cargos to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.tipos_documento to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.requisitos_cargo to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.aspirantes to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.enlaces_acceso to 'synco_app'@'localhost';
grant select, insert, update, delete on synco.documentos to 'synco_app'@'localhost';

-- Alertas del SOC: el backend las lee y las marca como atendidas
grant select, update on synco.alertas_seguridad to 'synco_app'@'localhost';

-- Auditoría: SOLO lectura. Los triggers escriben en ella con los permisos de quien
-- creó el esquema, así que el backend nunca puede alterarla ni vaciarla (ni con TRUNCATE).
grant select on synco.auditoria to 'synco_app'@'localhost';

-- Vista del dashboard
grant select on synco.v_progreso_aspirantes to 'synco_app'@'localhost';

-- Procedimiento que registra cada intento de login y devuelve el resultado
grant execute on procedure synco.sp_registrar_intento_login to 'synco_app'@'localhost';
