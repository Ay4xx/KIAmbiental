// Registro.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registro.css"; // Importa tu archivo CSS para estilos
import SlideshowBackground from "./slideshow";

  
const Registro =  () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    /*ID: "",*/
    username: "",
    password: "",
    id_employees: ""
  });
  //
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    //
    setError("");
    setSuccess("");
  };
//async db
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:3001/api/registro", {
        username: formData.username,
        password: formData.password,
        id_employees: formData.id_employees,
      });

      if (response.data.message === "Usuario creado") {
        setSuccess("Registro exitoso. Redirigiendo al inicio...");
        setFormData({ username: "", contraseña: "" });
        setTimeout(() => navigate("/home"), 1500); // Redirige a inicio después de 1.5 segundos
      } else {
        setError("Error al registrar usuario");
      }
    } catch (err) {
      setError("Error del servidor o usuario ya existe");
    }
  };

  return (
    <div
      className="pagina-registro"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%)"
      }}
    >
      {/* Slideshow as overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        <SlideshowBackground />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center", // vertical center
          justifyContent: "center", // horizontal center
          minHeight: "100vh",
          height: "100vh", // force full viewport height
          paddingTop: 0 // remove extra top padding
        }}
      >
        {/* Home Button vertically centered on the left */}
        <div
          id="header-title"
          onClick={() => navigate('/home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            padding: '18px 24px',
            width: 'fit-content',
            height: "fit-content",
            position: "relative"
          }}
          title="Ir a inicio"
        >
          <img
            className="KIAphoto"
            id="KIAphoto"
            src="./new-kia-logo-white.png"
            alt="KIA logo"
            style={{ height: 25, padding: 0 }}
          />
          <h1 style={{ margin: 0, color: "#ffffff", fontWeight: 700, fontSize: 36 }}>mbiental</h1>
        </div>

        {/* Registration Form - bigger container */}
        <div className="registro-container" style={{
          marginLeft: 48,
          width: 400,
          maxWidth: "95vw",
          padding: "48px 48px 48px 48px",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(60, 120, 200, 0.12)",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h2 style={{ color: "#05141f", marginBottom: 24 }}>Registro</h2>
          <form onSubmit={handleSubmit} className="registro-form" style={{ width: "100%" }}>
           {/* <label>
              ID de empleado:
              <input
                type="text"
                name="ID"
                value={formData.ID}
                onChange={handleChange}
                required
              />
            </label>*/}
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              ID de empleado:
              <input
                type="id_employees"
                name="id_employees"
                value={formData.id_employees}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
