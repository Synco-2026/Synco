import React, { useState } from "react";
import GradientWaves from "../components/Gradientwaves";
import SplitText from "../components/SplitText";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Upload,
  Shield,
  Camera,
  ArrowRight,
  GraduationCap,
  Building2,
} from "lucide-react";

export default function CandidatePortal() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Cédula de Ciudadanía",
      code: "Documento 01",
      status: "Subido",
      fileName: "cedula_de_ciudadania.pdf",
      verified: true,
      description: "Documento de identidad oficial por ambos lados",
    },
    {
      id: 2,
      title: "Hoja de Vida",
      code: "Documento 02",
      status: "Subido",
      fileName: "hoja_de_vida.pdf",
      verified: true,
      description: "Formato actualizado con experiencia y perfil profesional",
    },
    {
      id: 3,
      title: "Certificado de Estudios",
      code: "Documento 03",
      status: "Pendiente",
      fileName: null,
      verified: false,
      description: "Diploma de bachillerato, técnico, tecnólogo o universitario según aplique",
    },
    {
      id: 4,
      title: "Certificado Laboral",
      code: "Documento 04",
      status: "Pendiente",
      fileName: null,
      verified: false,
      description: "Carta firmada por empleador anterior con cargo, fechas y salario devengado",
    },
  ]);

  const handleAnimationComplete = () => {
    console.log("Animación de título completada");
  };

  return (
    <div className="position-relative min-vh-100 w-100 overflow-x-hidden bg-black font-sans text-light">
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

      {/* Estilos CSS internos para diseño Liquid UI Sólido */}
      <style>{`
        .liquid-card {
          background: linear-gradient(135deg, rgba(16, 24, 39, 0.94) 0%, rgba(10, 14, 23, 0.97) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.65), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .liquid-card:hover {
          border-color: rgba(255, 159, 252, 0.25);
          box-shadow: 0 14px 40px 0 rgba(0, 0, 0, 0.75), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2);
        }
        .liquid-success-card {
          background: linear-gradient(135deg, rgba(16, 24, 39, 0.94) 0%, rgba(10, 14, 23, 0.97) 100%);
          border: 1px solid rgba(34, 197, 94, 0.35);
          box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.65), inset 0 1px 1px 0 rgba(34, 197, 94, 0.2);
        }
        .upload-option-box {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.2s ease;
        }
        .upload-option-box:hover {
          border-color: #3b82f6;
          background: rgba(30, 41, 59, 0.9);
        }
      `}</style>

      {/* 2. Contenedor Principal */}
      <div
        data-bs-theme="dark"
        className="d-flex flex-column min-vh-100 position-relative pb-5"
        style={{ zIndex: 1 }}
      >
        {/* Top Navbar del Portal */}
        <header
          className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-3"
          style={{
            backgroundColor: "rgba(9, 13, 21, 0.92)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center fw-bold text-white shadow liquid-card"
              style={{ width: "40px", height: "40px" }}
            >
              S
            </div>
            <div>
              <h1 className="h6 fw-bold mb-0 text-white">SynCO</h1>
              <small className="text-white-50">Portal de Aspirantes</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill liquid-card"
              style={{ fontSize: "13px" }}
            >
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: "24px", height: "24px", fontSize: "11px" }}
              >
                MG
              </div>
              <span className="fw-semibold text-white">María García</span>
            </div>
          </div>
        </header>

        {/* Cuerpo Principal del Portal */}
        <main className="container py-4 flex-grow-1" style={{ maxWidth: "1000px" }}>
          {/* Badge de Proceso Activo */}
          <div className="mb-3">
            <span
              className="badge px-3 py-2 liquid-card text-info fw-semibold border border-info border-opacity-25"
              style={{ fontSize: "12px", borderRadius: "20px" }}
            >
              Proceso activo · Convocatoria Agosto 2026
            </span>
          </div>

          {/* Títulos Principales con SplitText integrado */}
          <div className="mb-4">
            <div className="display-6 fw-bold text-white mb-1">
              <SplitText
                text="Carga de Documentos"
                className="text-white"
                delay={40}
                duration={0.6}
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </div>
            <p className="text-white-50 m-0">
              Conductor Logístico · Medellín, Antioquia · Acceso por enlace temporal
            </p>
          </div>

          {/* Tarjeta de Progreso General */}
          <div className="liquid-card p-4 rounded-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
              <div>
                <h4 className="h5 fw-bold text-white mb-1">2 de 4 documentos subidos</h4>
                <p className="text-white-50 small mb-0">Faltan 2 documentos por cargar.</p>
              </div>
              <div className="text-end">
                <span className="fs-3 fw-bold text-success">50%</span>
                <small className="d-block text-white-50" style={{ fontSize: "10px" }}>
                  COMPLETADO
                </small>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div
              className="progress bg-dark my-3"
              style={{ height: "8px", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div
                className="progress-bar bg-success rounded-pill"
                style={{ width: "50%" }}
              ></div>
            </div>

            <div className="d-flex gap-4 text-small text-white-50" style={{ fontSize: "12px" }}>
              <span className="d-flex align-items-center gap-1 text-success">
                <span className="rounded-circle bg-success" style={{ width: "6px", height: "6px" }}></span> 2 subidos
              </span>
              <span className="d-flex align-items-center gap-1">
                <span className="rounded-circle bg-secondary" style={{ width: "6px", height: "6px" }}></span> 2 pendientes
              </span>
            </div>
          </div>

          {/* Caja de Información de Procesamiento Automático */}
          <div
            className="liquid-card p-3 px-4 rounded-4 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
            style={{ borderLeft: "4px solid #3b82f6" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary bg-opacity-15 text-primary d-flex align-items-center justify-content-center p-2"
                style={{ minWidth: "40px", height: "40px" }}
              >
                <Shield size={20} />
              </div>
              <div>
                <h5 className="h6 fw-bold text-white mb-1">Procesamiento automático incluido</h5>
                <p className="text-white-50 small mb-0">
                  Tus fotos se recortarán y convertirán a PDF automáticamente. <strong>No requiere instalar ninguna aplicación</strong>. Si la foto sale mal, podrás tomar otra.
                </p>
              </div>
            </div>

            <div className="d-flex gap-3 text-center border-start ps-4 border-secondary border-opacity-25 d-none d-md-flex">
              <div>
                <span className="d-block fw-bold text-white">256</span>
                <small className="text-white-50" style={{ fontSize: "10px" }}>Cifrado</small>
              </div>
              <div className="px-2">
                <span className="d-block fw-bold text-white">PDF</span>
                <small className="text-white-50" style={{ fontSize: "10px" }}>Auto</small>
              </div>
              <div>
                <span className="d-block fw-bold text-white">0</span>
                <small className="text-white-50" style={{ fontSize: "10px" }}>Instalaciones</small>
              </div>
            </div>
          </div>

          {/* Cuadrícula de Tarjetas de Documentos */}
          <div className="row g-4 mb-4">
            {documents.map((doc) => (
              <div className="col-12 col-md-6" key={doc.id}>
                <div
                  className={`p-4 rounded-4 h-100 d-flex flex-column justify-between ${
                    doc.verified ? "liquid-success-card" : "liquid-card"
                  }`}
                >
                  <div>
                    {/* Cabecera de la tarjeta */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        {doc.id === 3 ? (
                          <GraduationCap size={22} className="text-info" />
                        ) : doc.id === 4 ? (
                          <Building2 size={22} className="text-info" />
                        ) : null}
                        <div>
                          <small
                            className={`d-block text-uppercase fw-bold mb-1 ${
                              doc.verified ? "text-success" : "text-white-50"
                            }`}
                            style={{ fontSize: "11px" }}
                          >
                            {doc.code}
                          </small>
                          <h4 className="h5 fw-bold text-white mb-0">{doc.title}</h4>
                        </div>
                      </div>
                      <span
                        className={`badge border px-2.5 py-1 ${
                          doc.verified
                            ? "bg-success bg-opacity-20 text-success border-success border-opacity-40"
                            : "bg-secondary bg-opacity-20 text-light border-secondary"
                        }`}
                        style={{ fontSize: "11px" }}
                      >
                        {doc.status}
                      </span>
                    </div>

                    <p className="text-white-50 small mb-3" style={{ fontSize: "12px" }}>
                      {doc.description}
                    </p>

                    {/* Contenido según si está subido o pendiente */}
                    {doc.verified ? (
                      <div
                        className="p-3 rounded-3 d-flex align-items-center justify-content-between mb-3"
                        style={{
                          backgroundColor: "rgba(15, 23, 42, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2 text-truncate">
                          <FileText size={18} className="text-danger flex-shrink-0" />
                          <div className="text-truncate">
                            <span className="d-block font-monospace small text-white text-truncate">
                              {doc.fileName}
                            </span>
                            <small className="text-success" style={{ fontSize: "10px" }}>
                              Convertido a PDF · Listo
                            </small>
                          </div>
                        </div>
                        <button className="btn btn-link btn-sm text-info text-decoration-none p-0 fw-semibold" style={{ fontSize: "12px" }}>
                          Cambiar
                        </button>
                      </div>
                    ) : (
                      /* Opciones de Carga (PC y Cámara Web) */
                      <div className="row g-2 mb-2">
                        <div className="col-6">
                          <div className="upload-option-box p-3 rounded-3 text-center h-100 d-flex flex-column align-items-center justify-content-center" style={{ cursor: "pointer" }}>
                            <Upload size={22} className="text-primary mb-2" />
                            <span className="d-block fw-bold text-white small mb-1" style={{ fontSize: "12px" }}>
                              Subir archivo<br />de mi PC
                            </span>
                            <small className="text-white-50" style={{ fontSize: "9px" }}>
                              JPG, PNG, PDF, Word
                            </small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="upload-option-box p-3 rounded-3 text-center h-100 d-flex flex-column align-items-center justify-content-center" style={{ cursor: "pointer" }}>
                            <Camera size={22} className="text-warning mb-2" />
                            <span className="d-block fw-bold text-white small mb-1" style={{ fontSize: "12px" }}>
                              Usar<br />Cámara Web
                            </span>
                            <small className="text-white-50" style={{ fontSize: "9px" }}>
                              Sin instalaciones[cite: 3]
                            </small>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pie de la tarjeta */}
                  <div className="pt-2 border-top border-secondary border-opacity-10 mt-2">
                    <small
                      className={`d-flex align-items-center gap-1 ${
                        doc.verified ? "text-success" : "text-white-50"
                      }`}
                      style={{ fontSize: "11px" }}
                    >
                      {doc.verified ? (
                        <>
                          <CheckCircle2 size={13} /> Documento verificado y almacenado correctamente
                        </>
                      ) : (
                        <>
                          <AlertCircle size={13} /> Pendiente de carga por el aspirante
                        </>
                      )}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Barra inferior flotante de finalización y envío */}
          <div className="liquid-card p-4 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h5 className="h6 fw-bold text-white mb-1">Completa todos los documentos para continuar</h5>
              <small className="text-white-50">2 documentos pendientes · Tiempo estimado: 4 min</small>
            </div>
            <button
              className="btn btn-secondary px-4 py-2.5 rounded-3 text-white fw-semibold d-flex align-items-center gap-2 disabled opacity-50"
              style={{ cursor: "not-allowed", border: "none" }}
              disabled
            >
              Enviar Expediente <ArrowRight size={16} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}