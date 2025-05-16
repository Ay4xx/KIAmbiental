// Registro.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {

  const navigate = useNavigate();

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
    <div className="pagina-registro"
    style={{overflowX: 'hidden'}}>
      <header className='header' id="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}>
        <div id="header-title" onClick={() => navigate('/home')}>
        <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png"></img>
        <h1>mbiental</h1>
        </div>
        <div id="h2-group"
        style={{marginRight: 24, display: 'flex', gap: '32px'}}>
          <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
        </div>
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
