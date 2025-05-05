import { useNavigate } from "react-router-dom";
import "./Home.css";
import React, { useState } from 'react';
import Boxes from './boxes';

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
        <div class="card-group">
          <div class="card">
            <img class="card-img-top" src="./new-kia-logo-white.png" alt="Card image cap"></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <a href="#" class="read-more">
                Read more <span class="sr-only">about this is some title</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div class="card">
            <img class="card-img-top" src="./new-kia-logo-white.png" alt="Card image cap"></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="read-more">
                Read more <span class="sr-only">about this is some title</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div class="card">
            <img class="card-img-top" src="./new-kia-logo-white.png" alt="Card image cap"></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="#" class="read-more">
                Read more <span class="sr-only">about this is some title</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

        <div class="boxes">
          <Boxes />
        </div>

      <div class="footer">
        <h2>Footer</h2>
        <p>Derechos reservados KIAmbiental 2023</p>
        <p>Desarrollado por: Grupo 4</p>
        <p>Contacto:</p>
      </div>



    </div>
  )
}

export default Home