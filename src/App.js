// Importamos los módulos de rutas y los componentes de página
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";
import './App.css';

// Componente principal de la aplicación
function App() {
  const [autenticado, setAutenticado] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        // Ruta para iniciar sesión, pasamos la función que actualiza el estado de autenticación
        <Route path="/login" element={<Login setAutenticado={setAutenticado} />} />
        
        // Ruta protegida: solo accesible si el usuario está autenticado
      </Routes>
    </BrowserRouter>
  );
}

export default App;