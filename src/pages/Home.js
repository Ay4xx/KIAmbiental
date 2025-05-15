import { useNavigate } from "react-router-dom";
import "./Home.css";
import React, { useState } from 'react';
import ActionAreaCard from './Card.js';
import SlideshowBackground from './slideshow.js';

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
        <div id="header-title" onClick={() => navigate('/home')}>
        <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png"></img>
        <h1>mbiental</h1>
        </div>
        <div id="h2-group">
          <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
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

        {/* <button
      <button 
        className="menu-button" 
        onClick={handleToggleMenu} 
      >
        ⋮ 
      </button>

      */}

      </div>
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
        <SlideshowBackground />

        {/*
        <div className="intro" id="intro">
          <h1>Bienvenido a la página de inicio</h1>
        </div>
        */}

        <div class="tarjetas">
          <ActionAreaCard />
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


    </div>
  )
}

export default Home