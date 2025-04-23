import { useState } from "react";
// Hook para redirigir a otra ruta
import { useNavigate } from "react-router-dom";

function Login({ setAutenticado }) {

// Hook de navegación
  const navigate = useNavigate();

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarLogin = () => {
    // Simulacion de credenciales validas
    const usuario = "admin";
    const contrasena = "1234";

    if (username === usuario && password === contrasena) {
      setAutenticado(true);
      navigate("/dashboard")
    } else {
      setError("Usuario o contraseña incorrectos");
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
    <h2 
    style={{ textAlign: "center", marginBottom: "1rem"  }}>
        Iniciar sesión
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
        placeholder="Usuario"
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
        placeholder="Contraseña"
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
        Iniciar sesión
      </button>
    </div>
  </div>
  );
 }


export default Login;
