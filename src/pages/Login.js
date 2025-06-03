import { useState } from "react";
//  para redirigir a otra ruta
import { useNavigate } from "react-router-dom";
import axios from "axios";
// para i18n
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

function Login({ setAutenticado }) {

// Hook de navegación
  const navigate = useNavigate();
  // hhook idioma
  const { t, i18n } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarLogin = async (e) => {
    // Simulacion de credenciales validas
    // const usuario = "admin";
    // const contrasena = "1234";  
    e.preventDefault();
    
    try{
      const res = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      setAutenticado(true);
      navigate("/home");
      
    }catch (err) {
    console.error(err);
    setError(t('login.error')); //asi es el uso del translter con las claves
    }

    
  }

  return (
    <div 
    style={{ 
      maxWidth: 400, 
      margin: "2rem auto", 
      padding: "1rem", 
      border: "1px solid #ddd", 
      borderRadius: 8 
      }}>
    
    <LanguageSelector/>

    <h2 
    style={{ textAlign: "center", marginBottom: "1rem"  }}>
        {t('login.title')}
    </h2>

    {error && (
      <div 
      role="alert" 
      style={{ color: "#721c24", 
      background: "#f8d7da", 
      padding: "0.5rem", 
      borderRadius: 4, 
      marginBottom: "1rem" }}>
        {error}
      </div>
    )}

    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "0.75rem" }}>
      {/* Campo Usuario */}
      <input
        type="text"
        placeholder={t('login.username')}
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ 
          padding: "0.5rem", 
          borderRadius: 4, 
          border: "1px solid #ccc" }}
      />

      {/* Campo Contraseña */}
      <input
        type="password"
        placeholder={t('login.password')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ 
          padding: "0.5rem", 
          borderRadius: 4, 
          border: "1px solid #ccc" }}
      />

      {/* Botón de login */}
      <button
        onClick={manejarLogin}
        style={{
          padding: "0.75rem",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        {t('login.button')}
      </button>
    </div>
  </div>
  );
 }


export default Login;
