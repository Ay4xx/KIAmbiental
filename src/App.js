// Importamos los módulos de rutas y los componentes de página
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import { useState } from "react";
import './App.css';
import Excels from "./pages/Excels";
import Tables from "./pages/tables";
import { jwtDecode } from "jwt-decode";
//unity 
import UnityPlayer from './components/UnityPlayer';


// Componente principal de la aplicación
function App() {
  const [autenticado, setAutenticado] = useState(false);
  

  
  return (
    <BrowserRouter>
      <Routes>
        {/* : Unity */}
         <Route path="/" element={<UnityPlayer />} />



        <Route path="/" element={<Navigate to="/login" replace />} />pruebapara dash, la volvi raiz
        <Route
          path="/login"
          element={<Login setAutenticado={setAutenticado} />}
        />

        <Route
          path="/dashboard"
          element={
            autenticado
              ? <Dashboard setAutenticado={setAutenticado}/>
              : <Navigate to="/login" replace />
          }
        />
        
        {/* solo accesible si el usuario está autenticado, igual para dash*/}
        <Route
          path="/home"
          element={
            autenticado
              ? <Home setAutenticado={setAutenticado} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/perfil"
          element={
            autenticado
              ? <Perfil setAutenticado={setAutenticado} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/registro"
          element={
            autenticado
              ? <Registro />
              : <Navigate to="/home" replace />
          }
        />
        <Route
          path="/descargar"
          element={
            autenticado
              ? <Excels setAutenticado={setAutenticado} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tablas"
          element={
            autenticado
              ? <Tables setAutenticado={setAutenticado} />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;