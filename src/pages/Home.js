import { useNavigate } from "react-router-dom";

import React from 'react'

function Home() {
  return (
    <div className="Home">
      
      <header>
        <img src="/public/LOGO KIA fondo transparente.png"></img>
        <h1>KIAmbiental</h1>
        <h2>Usuario</h2>
        <h2>Opciones</h2>
        <h2>Lenguaje</h2>
      </header>

      <h1>Bienvenido a la página de inicio</h1>

      <div className="carta">
        <img src="/public/logo512"></img>
        <h4>Tablero</h4>
        <p>Accede al tablero</p>
      </div>

    </div>
  )
}

export default Home