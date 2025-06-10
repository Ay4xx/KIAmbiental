import { useNavigate } from "react-router-dom";
import "./Home.css";
import React, { useState } from 'react';
import ActionAreaCard from './Card.js';
import SlideshowBackground from './slideshow.js';
//traductor
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';

function Home() {

  //para ir a dash
  const navigate = useNavigate();
  //para que se abra y cierre
  // const [open, setOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false); 
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen); // abre/cierra menu
  };

  const { t, i18n } = useTranslation();
 
  

  return (
    <div className="Home" id="home">
      
      <header className='header' id="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}>
        <div id="header-title" onClick={() => navigate('/home')}>
        <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png"></img>
        <h1>mbiental</h1>
        </div>
        <div id="h2-group"
        style={{marginRight: 24, display: 'flex', gap: '32px'}}>
          <h2 style={{
            position: 'relative', 
            top: 6, 
            cursor: 'pointer', 
            fontSize: '1rem', 
            fontWeight: 500, 
            fontFamily: 'Formula1-Regular' }
          } onClick={() => navigate('/perfil')}>Perfil</h2>
          <LanguageSelector 
          style={
            { display: 'flex', alignItems: 'center', cursor: 'pointer' }
          }/>
        </div>
        </header>

      <div id="home-content">
        <SlideshowBackground />

        {/*
        <div className="intro" id="intro">
          <h1>Bienvenido a la página de inicio</h1>
        </div>
        */}

        <div class="tarjetas"
        style={{
          position: 'absolute',
          top: '60%',
        }}>
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