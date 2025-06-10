// Importamos los módulos de rutas y los componentes de página
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Home  from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard"; //  crearlo

import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import { useState, useEffect } from "react";
import './App.css';
import Excels from "./pages/Excels";
import Tables from "./pages/tables";
import { jwtDecode } from "jwt-decode";
//unity 
import UnityPlayer from './components/UnityPlayer';


function App() {

  //esta autenticado? de aqui sale
  const [autenticado, setAutenticado] = useState(
    () => Boolean(sessionStorage.getItem("token"))
  );

  //rol del token
  const [role, setRole] = useState(() => {
    const t = sessionStorage.getItem("token");
    return t ? jwtDecode(t).type_user : null;
  });
  
  //  // cada q cambie autenticado, lo guardamos
  // useEffect(() => {
  //   sessionStorage.setItem("auth", autenticado ? "true" : "false");
  // }, [autenticado]);
  // Cuando desloguees, elimina token y rol

  
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setAutenticado(false);
    setRole(null); 
  };

//cleanup token
  useEffect(() => {
    if (!autenticado) {
      sessionStorage.removeItem("token");
    }
  }, [autenticado]);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/"
         element={
          autenticado
          ?
         <Navigate to="/home" replace />
          : <Navigate to="/login" replace />
          }
           />

        <Route
          path="/login"
          element={
          <Login
           setAutenticado={setAutenticado}
           setRole={setRole} />}
        />

        <Route
          path="/dashboard"
          element={
            autenticado
               ? (
                  role === "admin"
                    ? <Dashboard onLogout={handleLogout} />
                    : <UserDashboard onLogout={handleLogout} />
                )
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/home"
          element={
            autenticado
              ? <Home onLogout={handleLogout} role={role}/>
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

        {/* : Unity */}
        <Route 
          path="/juego"
          element={
            autenticado
            ? <UnityPlayer />
            : <Navigate to="/login" replace/>
          }
        />
        {/* solo aadmins*/}


        <Route
          path="/registro"
          element={
            autenticado && role === "admin"
              ? <Registro />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/descargar"
          element={
            autenticado && role === "admin"
              ? <Excels setAutenticado={setAutenticado} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tablas"
          element={
            autenticado && role === "admin"
              ? <Tables setAutenticado={setAutenticado} />
              : <Navigate to="/login" replace />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;