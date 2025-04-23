import { useState } from "react";
// Hook para redirigir a otra ruta
import { useNavigate } from "react-router-dom";

function Login({ setAutenticado }) {

// Hook de navegación
  const navigate = useNavigate();

  
  const {[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarLogin = () => {
    // Simulacion de credenciales validas
    const usuario = "admin";
    const contrasena = "1234";

    if (username === usuario && password === contrasena) {
      setAutenticado(true);
      navigate()
    } else {
      setError{"Usuario o contraseña incorrectos"};
    }
  };  const navigate = useNavigate();
  return {
    <div style={style.container}>
      <h2 style={StyleSheet.heading}>Iniciar sesion</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e)} => setUsername(e.target.value)}
  }    </div>
  );
}

export default Login;
