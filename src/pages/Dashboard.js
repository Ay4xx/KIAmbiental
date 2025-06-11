import { useNavigate } from "react-router-dom";

import PorcentajeResiduosChart from "../graficas/porcentaje_residuos.js";
import QuantitySumTransporter from "../graficas/quantity_sum_transporter.js";
import SumMonth from "../graficas/sum_month.js";
import WasteCounts from "../graficas/waste_counts.js";

import React, {useState} from 'react';

import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';

function Dashboard() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const graphs = [
    { name: "Porcentaje de residuos", component: <PorcentajeResiduosChart /> },
    { name: "Cantidad total de residuos por transportista", component: <QuantitySumTransporter /> },
    { name: "Suma de cantidad por mes por tipo de residuo", component: <SumMonth /> },
    { name: "Contador de tipos de residuos", component: <WasteCounts /> }
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
        <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png" alt="KIA logo"></img>
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