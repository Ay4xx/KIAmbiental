// Hook para redirigir a otra ruta
import { useNavigate } from "react-router-dom";

function Login({ setAutenticado }) {

// Hook de navegación
  const navigate = useNavigate();

// Simula el inicio de sesión
  const manejarLogin = () => {
    setAutenticado(true);  // Actualiza el estado global
    navigate("/perfil");  // Redirige al perfil
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <button onClick={manejarLogin}>Entrar</button>
    </div>
  );
}

export default Login;