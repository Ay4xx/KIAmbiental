// Registro.js
import React, { useState } from "react";
import "./App.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="pagina-registro">
      <header className="encabezado-superior">
        <h1>KIAmbiental</h1>
      </header>

      <div className="registro-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} className="registro-form">
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
