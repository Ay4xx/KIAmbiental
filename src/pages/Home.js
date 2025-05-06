import { useNavigate } from "react-router-dom";
import "./Home.css";
import React, { useState } from 'react';
import Boxes from './boxes';
import ActionAreaCard from './Card.js';

function Home() {

  //para ir a dash
  const navigate = useNavigate();
  //para que se abra y cierre
  // const [open, setOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false); 
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen); // abre/cierra menu
  };
 

  return (
    <div className="Home" id="home">
      
      <header className='header' id="header">
        <img className="KIAphoto" src="./LOGO KIA fondo transparente.png"></img>
        <h1>KIAmbiental</h1>
        <div id="h2-group">
          <h2>Usuario</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
        </div>
        {/*para ir a dash*/}
        {/* <button
          onClick={() => setOpen(!open)}
          style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
          aria-label="Menu"
        >
          ⋮
        </button>
        {open && (
          <ul style={{ position: 'absolute', top: '2.5rem', right: 16, background: '#fff', padding: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', listStyle: 'none' }}>
            <li><button onClick={() => { navigate('/dashboard'); setOpen(false); }}>Ir al Dashboard</button></li>
          </ul>
        )} */}
        {/*manejare estilos en el css*/}
      <button 
        className="menu-button" 
        onClick={handleToggleMenu} 
      >
        ⋮ 
      </button>

      {/*  si menuOpen es true, se muestra */}
      {menuOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}>
            Dashboard
          </li>
          <li onClick={() => { navigate('/registro'); setMenuOpen(false); }}>
            Registro
          </li>
          {/* por si queremos agregar mas cosas */}
        </ul>
      )}



      </header>
      <div id="home-content">
        <div className="intro" id="intro">
          <h1>Bienvenido a la página de inicio</h1>
        </div>

        <div>
          <ActionAreaCard />
        </div>

      </div>
{/*
        <div class="boxes">
          <Boxes />
        </div>

      <div class="footer">
        <h2>Footer</h2>
        <p>Derechos reservados KIAmbiental 2023</p>
        <p>Desarrollado por: Grupo 4</p>
        <p>Contacto:</p>
      </div>

*/}

    </div>
  )
}

export default Home