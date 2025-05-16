import { useNavigate } from "react-router-dom";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

import Card from '@mui/material/Card';

import CantidadXarea from "../graficas/cantidadXarea.js";
import KgXano from "../graficas/kgXano.js";

import React, {useState} from 'react';

function Dashboard() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const graphs = [
    { name: "Cantidad por Área", component: <CantidadXarea /> },
    { name: "Kg X Año", component: <KgXano /> },
  ];
  
  const filteredGraphs = graphs.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id='dashboard'
    style={{overflowX: 'hidden'}}>
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
          <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
        </div>
        </header>
  <main>
    <input
          type="text"
          placeholder="Buscar gráfica..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ margin: 24, padding: 8, fontSize: 16, borderRadius: '4px', border: '1px solid #ccc' }}
        />
    <div
      className="charts-grid"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',  
        justifyContent: 'center',
        marginTop: 40,
        padding: 24,
      }}
    >
      {filteredGraphs.map(g => g.component)}
    </div>
  </main>


    </div>
  );
}

export default Dashboard;