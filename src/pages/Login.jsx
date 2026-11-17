import React, { useState } from "react";
import Botonvali from "../components/Botonvali";
import GradientWaves from "../components/Gradientwaves";
import SpecularButton from "../components/Specularbutton";
import CodeSlots from "../components/CodeSlots";
import fondoLogin from "../images/fondo-login.jpg";
import { validateForm } from "../controllers/loginController";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("ejemplo@empresa.com.co");
  const [password, setPassword] = useState("••••••••••••••");
  const [codeStatus, setCodeStatus] = useState("idle");
  const [authCode, setAuthCode] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm({ loginEmail: email, loginPassword: password });
    setValidationErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    console.log("Iniciando sesión en SynCO HR...", { authCode });
  };

  return (
    <div className="position-relative min-vh-100 w-100 overflow-hidden bg-black">
      {/* 1. Fondo de ondas optimizado en calidad baja para cero lag */}
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

      {/* 2. Contenido principal del Login flotando encima */}
      <div
        className="d-flex align-items-center justify-content-center py-4 position-relative"
        style={{ minHeight: "100vh", zIndex: 1 }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-11 col-xxl-10">
              {/* Apartado de seguridad superior estilizado */}
              <div className="d-flex align-items-center justify-content-between mb-3 px-2">
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill shadow-sm"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <span
                    className="bg-success rounded-circle"
                    style={{
                      width: "7px",
                      height: "7px",
                      boxShadow: "0 0 8px #22c55e",
                    }}
                  ></span>
                  <span
                    className="text-white small tracking-wide"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Acceso Seguro Restringido • Nodo Medellín
                  </span>
                </div>
                <span
                  className="text-white-50 small fw-medium px-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  SynCO HR v0.1
                </span>
              </div>

              {/* Contenedor principal */}
              <div
                className="card border-0 rounded-4 overflow-hidden animate-fade-in card-3d-effect"
                style={{
                  backgroundColor: "#070b12",
              
                }}
              >
                <div className="row g-0">
                  {/* LEFT SIDE */}
                  <div
                    className="col-lg-6 brand-side d-none d-lg-flex flex-column justify-content-between p-5 text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
                      position: "relative",
                      overflow: "hidden",
                      borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div
                      className="position-absolute top-0 start-0 end-0 bottom-0"
                      style={{
                        backgroundImage: `url(${fondoLogin})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.12,
                      }}
                    ></div>

                    <div className="position-relative z-1">
                      <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="bg-white text-dark p-2 rounded-3 shadow">
                          <i className="fa-solid fa-folder-open fs-4"></i>
                        </div>
                        <h4 className="fw-black m-0 tracking-tight text-white">
                          SynCO{" "}
                          <span className="badge bg-success bg-opacity-25 text-success fs-6">
                            HR
                          </span>
                        </h4>
                      </div>
                      <h2 className="fw-bold mb-3 display-6 text-white">
                        Gestión Documental y Talento Humano
                      </h2>
                      <p
                        className="text-white lead fs-6"
                        style={{ opacity: 0.8 }}
                      >
                        Plataforma corporativa optimizada para automatización de
                        onboarding, expedientes digitales y control de
                        normativas institucionales.
                      </p>
                    </div>

                    <div className="position-relative z-1 mt-5">
                      <div className="card bg-black bg-opacity-50 border-opacity-15 text-white p-3 rounded-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="small fw-bold text-success">
                            <i className="fa-solid fa-circle fa-2xs me-1"></i>{" "}
                            Servidor Medellín
                          </span>
                          <span className="badge bg-success bg-opacity-25 text-success">
                            100% Operativo
                          </span>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between align-items-center mt-3 text-white small"
                        style={{ opacity: 0.7 }}
                      >
                        <span>Versión v0.0.1</span>
                        <span>Synco.business@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE (Formulario) */}
                  <div
                    className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center"
                    style={{ backgroundColor: "#0b0f19" }}
                  >
                    <div className="d-lg-none text-center mb-4">
                      <div className="d-inline-flex align-items-center gap-2 mb-1">
                        <div className="bg-primary text-white p-2 rounded-3">
                          <i className="fa-solid fa-folder-open"></i>
                        </div>
                        <h3 className="fw-bold text-white m-0">
                          SynCO{" "}
                          <span className="badge bg-primary-subtle text-primary fs-6">
                            HR
                          </span>
                        </h3>
                      </div>
                      <p
                        className="text-white small m-0"
                        style={{ opacity: 0.8 }}
                      >
                        Portal Corporativo de Recursos Humanos
                      </p>
                    </div>

                    {/* Alerta TLS 1.3 */}
                    <div
                      className="rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between shadow-sm"
                      style={{
                        backgroundColor: "#111827",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="bg-success bg-opacity-10 text-success rounded-circle p-2 d-flex align-items-center justify-content-center"
                          style={{ width: "38px", height: "38px" }}
                        >
                          <i className="fa-solid fa-lock"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-white mb-0 fs-6">
                            Autenticación Multifactor
                          </h6>
                          <small
                            className="text-white"
                            style={{ opacity: 0.7 }}
                          >
                            • Analista / Administrador
                          </small>
                        </div>
                      </div>
                      <span className="badge bg-success bg-opacity-25 text-success px-2.5 py-1 rounded-pill small fw-semibold">
                        <span
                          className="spinner-grow spinner-grow-sm text-success me-1"
                          role="status"
                          style={{ width: "0.45rem", height: "0.45rem" }}
                        ></span>{" "}
                        TLS 1.3
                      </span>
                    </div>

                    <form
                      id="loginForm" /* Formulario de inicio de sesión */
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <label
                            className="form-label fw-bold small text-uppercase text-white"
                            style={{ opacity: 0.8 }}
                          >
                            Correo Corporativo
                          </label>
                          <small
                            className="text-white"
                            style={{ opacity: 0.7 }}
                          >
                            @empresa.com.co
                          </small>
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text border-end-0 text-white rounded-start-3"
                            style={{
                              backgroundColor: "#111827",
                              borderColor: "#374151",
                              opacity: 0.8,
                            }}
                          >
                            <i className="fa-regular fa-envelope"></i>
                          </span>
                          <input
                            id="loginEmail" /* Correo corporativo */
                            type="email"
                            className="form-control border-start-0 ps-0 shadow-none text-white"
                            style={{
                              backgroundColor: "#111827",
                              borderColor: "#374151",
                              color: "#ffffff",
                            }}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setValidationErrors((errors) => ({
                                ...errors,
                                loginEmail: "",
                              }));
                            }}
                            aria-invalid={Boolean(validationErrors.loginEmail)}
                            aria-describedby={
                              validationErrors.loginEmail
                                ? "login-email-error"
                                : undefined
                            }
                          />
                        </div>
                        {validationErrors.loginEmail && (
                          <small
                            id="login-email-error"
                            className="text-danger d-block mt-1"
                            role="alert"
                          >
                            {validationErrors.loginEmail}
                          </small>
                        )}
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <label
                            className="form-label fw-bold small text-uppercase text-white"
                            style={{ opacity: 0.8 }}
                          >
                            Contraseña
                          </label>
                          <small
                            className="text-white"
                            style={{ opacity: 0.7 }}
                          >
                            Mínimo 12 caracteres
                          </small>
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text border-end-0 text-white rounded-start-3"
                            style={{
                              backgroundColor: "#111827",
                              borderColor: "#374151",
                              opacity: 0.8,
                            }}
                          >
                            <i className="fa-solid fa-lock"></i>
                          </span>
                          <input
                            id="loginPassword" /* Contraseña */
                            type={showPassword ? "text" : "password"}
                            className="form-control border-start-0 border-end-0 ps-0 shadow-none fw-bold text-white"
                            style={{
                              backgroundColor: "#111827",
                              borderColor: "#374151",
                              color: "#ffffff",
                            }}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setValidationErrors((errors) => ({
                                ...errors,
                                loginPassword: "",
                              }));
                            }}
                            aria-invalid={Boolean(validationErrors.loginPassword)}
                            aria-describedby={
                              validationErrors.loginPassword
                                ? "login-password-error"
                                : undefined
                            }
                          />
                          <span
                            className="input-group-text border-start-0 text-white rounded-end-3"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#111827",
                              borderColor: "#374151",
                              opacity: 0.8,
                            }}
                          >
                            <i
                              className={
                                showPassword
                                  ? "fa-regular fa-eye-slash"
                                  : "fa-regular fa-eye"
                              }
                            ></i>
                          </span>
                        </div>
                        {validationErrors.loginPassword && (
                          <small
                            id="login-password-error"
                            className="text-danger d-block mt-1"
                            role="alert"
                          >
                            {validationErrors.loginPassword}
                          </small>
                        )}
                      </div>

                      {/* Bloque Authenticator con CodeSlots ajustado al contenedor */}
                      <div
                        className="p-3 rounded-3 mb-3 overflow-hidden"
                        style={{
                          backgroundColor: "#111827",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="form-check m-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultChecked
                              disabled
                              id="check2fa"
                            />
                            <label
                              className="form-check-label fw-bold small text-white"
                              htmlFor="check2fa"
                            >
                              Validación 2FA Activa
                            </label>
                          </div>
                          <span className="badge bg-success bg-opacity-25 text-success px-2 py-1 rounded-pill small fw-semibold">
                            <i className="fa-solid fa-shield-check me-1"></i>{" "}
                            Authenticator
                          </span>
                        </div>

                        {/* Contenedor del CodeSlots con tamaño optimizado para el ancho del formulario */}
                        <div className="d-flex justify-content-center my-3 w-100 overflow-x-auto py-1">
                          <CodeSlots
                            id="login-auth-code" /* Código de autenticación 2FA */
                            length={6}
                            status={codeStatus}
                            onChange={(code) => {
                              setAuthCode(code);
                              setCodeStatus("idle");
                            }}
                            onComplete={async (code) => {
                              setAuthCode(code);
                              setCodeStatus("success");
                            }}
                            accentColor="#ebf1f7"
                            inkColor="#ebebeb"
                            slotColor="#242f3f"
                            digitColor="#0f0606"
                            dangerColor="#ef4444"
                            slotSize={36}
                            gap={6}
                            radius={8}
                            bounce={0.2}
                            settle={0.3}
                            rise={8}
                            cascade={20}
                            mask={false}
                            caret
                            outcome="accept"
                            disabled={false}
                          />
                        </div>

                        <small
                          className="text-white d-block mt-2 text-center"
                          style={{ fontSize: "0.75rem", opacity: 0.7 }}
                        >
                          Ingrese el código temporal de Microsoft o Google
                          Authenticator.
                        </small>
                      </div>

                      <div className="mb-3">
                        <Botonvali
                          label="Recordar estación de trabajo (Vigencia 12 horas)"
                          strike="none"
                          color="#ffffff"
                          fillColor="#ffffff"
                          checkColor="#070b12"
                        />
                      </div>

                      {/* Alerta de advertencia personalizada */}
                      <div
                        className="rounded-3 p-2.5 mb-3 small d-flex gap-2 align-items-start"
                        style={{
                          backgroundColor: "rgba(234, 179, 8, 0.12)",
                          border: "1px solid rgba(234, 179, 8, 0.3)",
                          color: "#fef08a",
                        }}
                      >
                        <i className="fa-solid fa-triangle-exclamation text-warning mt-1"></i>
                        <div>
                          <strong className="text-white">
                            Política de Seguridad Activa:
                          </strong>
                          <span style={{ color: "#fde047" }}>
                            {" "}
                            Bloqueo automático y notificación al SOC tras{" "}
                            <strong className="text-white">
                              3 intentos fallidos
                            </strong>
                            .
                          </span>
                        </div>
                      </div>

                      {/* Botón Principal Specular */}
                      <div className="mb-3">
                        <SpecularButton
                          id="login-submit" /* Botón de envío del formulario */
                          size="lg"
                          radius={12}
                          tint="#3b82f6"
                          tintOpacity={0.15}
                          textColor="#ffffff"
                          lineColor="#60a5fa"
                          baseColor="#1e293b"
                          intensity={1.2}
                          idleIntensity={0.5}
                          shineSize={15}
                          shineFade={40}
                          thickness={1.5}
                          glow={1.5}
                          followMouse
                          proximity={250}
                          onClick={handleSubmit}
                          className="w-100"
                        >
                          <span className="fw-bold d-flex align-items-center justify-content-center gap-2 py-1 w-100 text-white">
                            <span>Ingresar al Portal de Gestión</span>
                            <i className="fa-solid fa-arrow-right-long text-info"></i>
                          </span>
                        </SpecularButton>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-light border-opacity-10 small">
                        <a
                          href="#"
                          className="text-decoration-none text-info fw-semibold"
                        >
                          <i className="fa-regular fa-circle-question me-1"></i>{" "}
                          ¿Olvidó su contraseña?
                        </a>
                        <span
                          className="text-white"
                          style={{ opacity: 0.7 }}
                        ></span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
