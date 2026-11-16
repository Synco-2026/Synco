import React, { useState } from "react";
import GradientWaves from "../components/Gradientwaves";
import PillNav from "../components/PillNav";
import AnimatedList from "../components/AnimatedList";
import HoldButton from "../components/Holdbutton";

import {
  Users,
  Search,
  ZoomIn,
  Download,
  Check,
  X,
  LayoutDashboard,
  User,
  Briefcase,
  Shield,
  LogOut,
  Menu,
} from "lucide-react";

export default function HRDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState("Carlos Mendoza");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const candidates = [
    {
      name: "Carlos Mendoza",
      cc: "1.034.567.890",
      role: "Conductor",
      city: "Bogotá",
      date: "04/08/2026",
      progress: "4/4",
      status: "Pendiente",
    },
    {
      name: "Laura Ríos",
      cc: "52.768.432.1",
      role: "Analista",
      city: "Medellín",
      date: "05/08/2026",
      progress: "3/4",
      status: "Incompleto",
    },
    {
      name: "Tomás Herrera",
      cc: "79.345.621.8",
      role: "Desarrollador",
      city: "Cali",
      date: "01/08/2026",
      progress: "4/4",
      status: "Aprobado",
    },
    {
      name: "Diana Castro",
      cc: "1.823.456.789",
      role: "Diseñadora",
      city: "Medellín",
      date: "03/08/2026",
      progress: "2/4",
      status: "Incompleto",
    },
    {
      name: "Jorge Salcedo",
      cc: "88.234.567.2",
      role: "Soporte",
      city: "Barranquilla",
      date: "02/08/2026",
      progress: "3/4",
      status: "Rechazado",
    },
    {
      name: "Valentina Mora",
      cc: "1.018.765.432",
      role: "Marketing",
      city: "Bogotá",
      date: "06/08/2026",
      progress: "4/4",
      status: "Pendiente",
    },
    {
      name: "Felipe Arango",
      cc: "98.234.567.1",
      role: "Logística",
      city: "Medellín",
      date: "07/08/2026",
      progress: "1/4",
      status: "Incompleto",
    },
  ];

  // Elementos del menú lateral con iconos integrados
  const moduleItems = [
    {
      title: (
        <span className="d-flex align-items-center gap-2 text-white">
          <Users size={16} className="text-info" /> Gestión de Expedientes
        </span>
      ),
      description: "7 aspirantes activos",
      meta: "Activo",
    },
    {
      title: (
        <span className="d-flex align-items-center gap-2 text-white">
          <User size={16} className="text-info" /> Perfiles de Empleados
        </span>
      ),
      description: "Base de datos RRHH",
      meta: "Ctrl",
    },
    {
      title: (
        <span className="d-flex align-items-center gap-2 text-white">
          <Briefcase size={16} className="text-info" /> Configuración de Vacantes
        </span>
      ),
      description: "Plazas corporativas",
      meta: "Ops",
    },
    {
      title: (
        <span className="d-flex align-items-center gap-2 text-white">
          <Shield size={16} className="text-info" /> Administración Global
        </span>
      ),
      description: "Permisos y accesos",
      meta: "Admin",
    },
  ];

  return (
    <div className="position-relative min-vh-100 w-100 overflow-x-hidden bg-black font-sans">
      {/* Estilos CSS internos para paneles más sólidos estilo Liquid UI */}
      <style>{`
        .liquid-card {
          background: linear-gradient(135deg, rgba(16, 24, 39, 0.94) 0%, rgba(10, 14, 23, 0.97) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.65), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .liquid-card:hover {
          border-color: rgba(255, 159, 252, 0.3);
          box-shadow: 0 14px 40px 0 rgba(0, 0, 0, 0.75), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2);
        }
        .liquid-input {
          background: rgba(15, 23, 42, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          color: #fff !important;
          transition: all 0.2s ease;
        }
        .liquid-input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3) !important;
        }
      `}</style>

      {/* 1. Fondo de ondas animadas */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ zIndex: 0 }}
      >
        <GradientWaves
          horizonColor="#0e244a"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.3}
          amplitude={2.0}
          relief={1}
          lightAngle={120}
          mouseInteraction
          swellOnClick
          lightMode={false}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={64}
          zoom={1}
          height={5.5}
          fogDepth={15}
          sheen={0}
          brightness={1}
          opacity={1}
          grain={0.2}
          quality="low"
          intro={false}
          parallaxStrength={0.3}
          mouseStrength={0.4}
          paused={false}
        />
      </div>

      {/* 2. Contenedor principal responsive */}
      <div
        data-bs-theme="dark"
        className="d-flex flex-column flex-lg-row min-vh-100 text-light position-relative"
        style={{ zIndex: 1 }}
      >
        {/* SIDEBAR IZQUIERDO RETRÁCTIL MÁS SÓLIDO */}
        <aside
          className="d-flex flex-column justify-between p-3 border-end position-relative"
          style={{
            width: sidebarOpen ? "280px" : "0px",
            minWidth: sidebarOpen ? "280px" : "0px",
            maxWidth: sidebarOpen ? "280px" : "0px",
            opacity: sidebarOpen ? 1 : 0,
            visibility: sidebarOpen ? "visible" : "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: "rgba(9, 13, 21, 0.95)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ minWidth: "250px" }}>
            {/* Logo / Header */}
            <div className="d-flex align-items-center gap-3 mb-4 px-2">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center fw-bold text-white shadow liquid-card"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                }}
              >
                S
              </div>
              <div>
                <h1 className="h6 fw-bold mb-0 text-white">SynCO</h1>
                <small className="text-white-50">Panel de RRHH</small>
              </div>
            </div>

            {/* Tarjetas de Métricas Resumen estilo sólido */}
            <div className="row g-2 mb-4">
              <div className="col-12">
                <div className="p-3 rounded-4 liquid-card">
                  <span className="d-block text-white-50 small text-uppercase fw-semibold">
                    Total Aspirantes
                  </span>
                  <span className="fs-3 fw-bold text-white">7</span>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 rounded-3 text-center liquid-card">
                  <small className="text-warning fw-semibold">2 Pendientes</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 rounded-3 text-center liquid-card">
                  <small className="text-success fw-semibold">1 Aprobados</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 rounded-3 text-center liquid-card">
                  <small className="text-danger fw-semibold">1 Rechazados</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 rounded-3 text-center liquid-card">
                  <small className="text-white-50 fw-semibold">3 Incompletos</small>
                </div>
              </div>
            </div>

            {/* Módulos de Navegación con AnimatedList */}
            <div className="mb-3">
              <small
                className="text-white-50 text-uppercase fw-semibold px-2 mb-2 d-block"
                style={{ fontSize: "0.7rem" }}
              >
                Módulos del Sistema
              </small>
              <AnimatedList
                items={moduleItems}
                onItemSelect={(item, index) => console.log("Módulo seleccionado:", item, index)}
                animation="pop"
                theme="dark"
                width="100%"
                maxHeight={200}
                radius={12}
                gap={6}
                stagger={0.02}
                fadeSize={40}
                frame={false}
                showGradients={false}
                displayScrollbar={true}
                selectOnHover
                enableArrowNavigation
                loop
                animateOnce={false}
                initialSelectedIndex={0}
              />
            </div>
          </div>

          {/* Perfil de Usuario en el Sidebar */}
          <div
            className="pt-3 border-top d-flex align-items-center justify-content-between mt-3"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)", minWidth: "250px" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center shadow liquid-card"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "rgba(59, 130, 246, 0.6)",
                }}
              >
                AP
              </div>
              <div>
                <p className="mb-0 small fw-bold text-white">Ana Pérez</p>
                <small className="text-white-50" style={{ fontSize: "11px" }}>
                  Analista de RRHH
                </small>
              </div>
            </div>
            <button className="btn btn-sm btn-link text-white-50 p-0 text-decoration-none">
              <LogOut size={18} />
            </button>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow-1 d-flex flex-column overflow-hidden">
          {/* Top Header más sólido */}
          <header
            className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-3"
            style={{
              minHeight: "75px",
              backgroundColor: "rgba(9, 13, 21, 0.92)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              {/* Botón para Abrir/Cerrar el Sidebar */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="btn btn-sm text-light rounded-3 d-flex align-items-center justify-content-center liquid-card"
                style={{
                  width: "38px",
                  height: "38px",
                }}
                title={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <Menu size={18} />
              </button>

              <div>
                <h2 className="h5 fw-bold mb-0 text-white">
                  Gestión de Expedientes
                </h2>
                <small className="text-white-50">
                  7 aspirantes · agosto 2026
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              {/* Buscador */}
              <div className="input-group" style={{ width: "200px" }}>
                <span
                  className="input-group-text text-white-50 border-end-0 rounded-start-3"
                  style={{ backgroundColor: "rgba(15, 23, 42, 0.9)", borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 text-light form-control-sm shadow-none liquid-input rounded-end-3"
                  placeholder="Buscar..."
                />
              </div>

              {/* Filtros rápidos con PillNav */}
              <div className="d-flex align-items-center">
                <PillNav
                  items={[
                    { label: "Todos", href: "/todos" },
                    { label: "Pendiente", href: "/pendiente" },
                    { label: "Aprobado", href: "/aprobado" },
                  ]}
                  highlightColor="#0647d2"
                  activeHref="/"
                  itemStyle="pill"
                  hoverEffect="fill"
                  indicator="none"
                  layout="split"
                  surface="glass"
                  size="md"
                  bounce={0.3}
                  stretch={0.5}
                  collapse="auto"
                  intro
                />
              </div>

              {/* Componente PillNav secundario */}
              <div className="d-flex align-items-center">
                <PillNav
                  items={[
                    { label: "Portal", href: "/portal" },
                    { label: "Login", href: "/login" },
                    { label: "Admin", href: "/dashboard" },
                  ]}
                  activeHref="/dashboard"
                  itemStyle="plain"
                  hoverEffect="glide"
                  indicator="pill"
                  layout="split"
                  surface="glass"
                  size="sm"
                  bounce={0.3}
                  stretch={0.5}
                  collapse="auto"
                />
              </div>
            </div>
          </header>

          {/* Dashboard Split View (Responsivo con estilo sólido) */}
          <div className="flex-grow-1 row g-3 p-3 p-md-4 overflow-hidden m-0">
            {/* TABLA / LISTA DE ASPIRANTES */}
            <div
              className="col-12 col-lg-5 col-xl-4 rounded-4 d-flex flex-column overflow-hidden p-0 liquid-card shadow-lg"
              style={{ minHeight: "350px" }}
            >
              <div
                className="row g-0 px-3 py-3 border-bottom text-light small fw-bold text-uppercase"
                style={{
                  fontSize: "11px",
                  backgroundColor: "rgba(11, 16, 26, 0.9)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="col-6">Aspirante</div>
                <div className="col-3 text-center">Avance</div>
                <div className="col-3 text-end">Estado</div>
              </div>

              <div className="overflow-y-auto flex-grow-1">
                {candidates.map((item, idx) => {
                  const [current, total] = item.progress.split('/').map(Number);
                  const progressPercent = (current / total) * 100;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedCandidate(item.name)}
                      className={`row g-0 align-items-center px-3 py-3 border-bottom transition`}
                      style={{
                        cursor: "pointer",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        backgroundColor:
                          item.name === selectedCandidate
                            ? "rgba(59, 130, 246, 0.18)"
                            : "transparent",
                      }}
                    >
                      <div className="col-6 d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle border d-flex align-items-center justify-content-center fw-bold small text-light liquid-card"
                          style={{
                            width: "38px",
                            height: "38px",
                            minWidth: "38px",
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                          }}
                        >
                          {item.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="text-truncate">
                          <p className="mb-0 small fw-bold text-white text-truncate">
                            {item.name}
                          </p>
                          <small
                            className="text-white-50"
                            style={{ fontSize: "11px" }}
                          >
                            {item.cc}
                          </small>
                        </div>
                      </div>

                      <div className="col-3 text-center">
                        <small
                          className="text-white-50 d-block mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          {item.progress}
                        </small>
                        <div
                          className="progress bg-dark"
                          style={{
                            height: "4px",
                            border: "1px solid rgba(255,255,255,0.15)",
                          }}
                        >
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="col-3 text-end">
                        <span
                          className={`badge border px-2 py-1 ${
                            item.status === "Pendiente"
                              ? "bg-warning bg-opacity-25 text-warning border-warning border-opacity-50"
                              : item.status === "Aprobado"
                                ? "bg-success bg-opacity-25 text-success border-success border-opacity-50"
                                : item.status === "Rechazado"
                                  ? "bg-danger bg-opacity-25 text-danger border-danger border-opacity-50"
                                  : "bg-secondary bg-opacity-25 text-light border-secondary"
                          }`}
                          style={{ fontSize: "10px" }}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DETALLE Y VISOR DE DOCUMENTO */}
            <div
              className="col-12 col-lg-7 col-xl-8 rounded-4 d-flex flex-column justify-between p-4 liquid-card shadow-lg overflow-hidden"
              style={{ minHeight: "450px" }}
            >
              <div className="d-flex flex-column h-100">
                <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle border d-flex align-items-center justify-content-center fw-bold text-info liquid-card"
                      style={{
                        width: "45px",
                        height: "45px",
                        minWidth: "45px",
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                      }}
                    >
                      CM
                    </div>
                    <div>
                      <h4 className="h6 fw-bold mb-0 text-white">
                        Carlos Mendoza
                      </h4>
                      <small
                        className="text-white-50"
                        style={{ fontSize: "12px" }}
                      >
                        CC · 1.034.567.890 &nbsp;•&nbsp; Conductor &nbsp;•&nbsp;
                        Bogotá &nbsp;•&nbsp; 04/08/2026
                      </small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <div className="text-end">
                      <small
                        className="text-white-50 d-block"
                        style={{ fontSize: "11px" }}
                      >
                        Docs: <strong className="text-white">4/4</strong>
                      </small>
                      <small
                        className="text-white-50"
                        style={{ fontSize: "10px" }}
                      >
                        Cargados el 04/08/2026
                      </small>
                    </div>
                    <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50 d-flex align-items-center gap-1 px-2 py-1.5">
                      <span
                        className="spinner-grow spinner-grow-sm text-warning"
                        style={{ width: "8px", height: "8px" }}
                      ></span>{" "}
                      Pendiente
                    </span>
                    <button
                      className="btn btn-sm text-light d-flex align-items-center gap-1 px-3 rounded-3 liquid-card"
                      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <Download size={14} /> Descargar todo
                    </button>
                  </div>
                </div>

                {/* Pestañas de Documentos */}
                <div
                  className="d-flex align-items-center gap-2 border-bottom pb-3 mb-3 flex-wrap"
                  style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <button
                    className="btn btn-sm btn-primary text-white d-flex align-items-center gap-2 px-3 py-1.5 shadow-sm fw-semibold"
                    style={{ backgroundColor: "#2563eb", border: "none" }}
                  >
                    <span
                      className="rounded-circle bg-white"
                      style={{ width: "6px", height: "6px" }}
                    ></span>{" "}
                    Cédula de Ciudadanía
                  </button>
                  <button
                    className="btn btn-sm text-light px-3 py-1.5 rounded-3 liquid-card"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Hoja de Vida
                  </button>
                  <button
                    className="btn btn-sm text-light px-3 py-1.5 rounded-3 liquid-card"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Cert. de Estudios
                  </button>
                  <button
                    className="btn btn-sm text-light px-3 py-1.5 rounded-3 liquid-card"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Cert. Laboral
                  </button>
                </div>

                {/* Visor PDF Estilizado */}
                <div
                  className="rounded-3 overflow-hidden d-flex flex-column flex-grow-1 mb-3 liquid-card"
                  style={{ minHeight: "260px" }}
                >
                  <div
                    className="px-3 py-2 d-flex align-items-center justify-content-between text-light border-bottom"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "rgba(11, 16, 26, 0.9)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex gap-1">
                        <div
                          className="rounded-circle bg-danger"
                          style={{ width: "10px", height: "10px" }}
                        ></div>
                        <div
                          className="rounded-circle bg-warning"
                          style={{ width: "10px", height: "10px" }}
                        ></div>
                        <div
                          className="rounded-circle bg-success"
                          style={{ width: "10px", height: "10px" }}
                        ></div>
                      </div>
                      <span
                        className="font-monospace text-light ms-2"
                        style={{ fontSize: "11px" }}
                      >
                        cedula_de_ciudadania.pdf
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-white-50">Pág 1/1</span>
                      <button className="btn btn-link btn-sm text-light p-0 text-decoration-none d-flex align-items-center gap-1">
                        <ZoomIn size={12} /> Zoom
                      </button>
                      <button className="btn btn-link btn-sm text-light p-0 text-decoration-none d-flex align-items-center gap-1">
                        <Download size={12} /> Descargar
                      </button>
                    </div>
                  </div>

                  {/* Vista previa simulada del documento */}
                  <div
                    className="p-4 overflow-y-auto flex-grow-1 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(8, 12, 20, 0.85)" }}
                  >
                    <div
                      className="w-100 rounded-3 p-4 shadow liquid-card"
                      style={{ maxWidth: "480px" }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="bg-primary rounded-2 d-flex align-items-center justify-content-center fw-bold text-white small"
                            style={{ width: "32px", height: "32px" }}
                          >
                            CO
                          </div>
                          <div>
                            <small
                              className="text-white-50 d-block text-uppercase fw-semibold"
                              style={{ fontSize: "9px" }}
                            >
                              República de Colombia
                            </small>
                            <h5
                              className="fw-bold mb-0 text-white"
                              style={{ fontSize: "14px" }}
                            >
                              CÉDULA DE CIUDADANÍA
                            </h5>
                          </div>
                        </div>
                        <div className="text-end">
                          <small
                            className="text-white-50"
                            style={{ fontSize: "9px" }}
                          >
                            SynCO v2.4
                          </small>
                          <p
                            className="font-monospace text-white-50 mb-0"
                            style={{ fontSize: "9px" }}
                          >
                            REF: SYN-2026-08-4471
                          </p>
                        </div>
                      </div>

                      <div
                        className="rounded-2 p-3 mb-2"
                        style={{
                          backgroundColor: "rgba(15, 23, 42, 0.95)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <small
                          className="text-white-50 d-block text-uppercase mb-1"
                          style={{ fontSize: "9px" }}
                        >
                          Nombre del Aspirante
                        </small>
                        <span
                          className="fw-bold text-white"
                          style={{ fontSize: "15px" }}
                        >
                          Carlos Mendoza
                        </span>
                      </div>

                      <div className="row g-2">
                        <div className="col-6">
                          <div
                            className="rounded-2 p-2"
                            style={{
                              backgroundColor: "rgba(15, 23, 42, 0.95)",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                          >
                            <small
                              className="text-white-50 d-block text-uppercase"
                              style={{ fontSize: "9px" }}
                            >
                              Número de Identificación
                            </small>
                            <span
                              className="font-monospace fw-bold text-light"
                              style={{ fontSize: "12px" }}
                            >
                              1.034.567.890
                            </span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className="rounded-2 p-2"
                            style={{
                              backgroundColor: "rgba(15, 23, 42, 0.95)",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                          >
                            <small
                              className="text-white-50 d-block text-uppercase"
                              style={{ fontSize: "9px" }}
                            >
                              Lugar de Expedición
                            </small>
                            <span
                              className="fw-bold text-light"
                              style={{ fontSize: "12px" }}
                            >
                              Bogotá
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones Inferiores (Aprobar / Rechazar con HoldButton) */}
              <div
                className="pt-3 border-top d-flex align-items-center gap-3 flex-wrap"
                style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <button
                  className="btn fw-semibold text-white px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                  style={{ backgroundColor: "#16a34a", border: "none" }}
                >
                  <Check size={16} /> Aprobar Expediente
                </button>

                <div className="flex-grow-1 d-flex align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="Causa de rechazo — obligatoria para rechazar..."
                    className="form-control text-light shadow-none py-2 liquid-input rounded-3"
                  />
                  <HoldButton
                    doneLabel="Rechazado"
                    backgroundColor="#dc2626"
                    fillColor="#ef4444"
                    textColor="#f5f5f5"
                    fillTextColor="#ffffff"
                    size="sm"
                    radius={10}
                    fillDirection="right"
                    holdTime={2000}
                    releaseTime={200}
                    pressScale={0.97}
                    wave
                    waveAmplitude={6}
                    glow
                    resetAfter={1200}
                    onHold={() => console.log('Rechazado confirmado')}
                  >
                    <span className="d-flex align-items-center gap-1 text-nowrap">
                      <X size={14} /> Mantén para rechazar
                    </span>
                  </HoldButton>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}