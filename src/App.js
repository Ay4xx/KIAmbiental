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
        <Route path="/" element={<Login />} />
        
        // solo accesible si el usuario está autenticado
        <Route path="/Home" element={<Home setAutenticado={setAutenticado} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;