import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Simulated fetch from database (replace with real API call)
const fetchTableData = async () => {
  // Generate 10 rows of 24 columns with sample data
  const rows = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 24; j++) {
      row.push(`R${i + 1}C${j + 1}`);
    }
    rows.push(row);
  }
  return rows;
};

function Tables() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTableData().then(setData);
  }, []);

  return (
    <div style={{ padding: 0,
      overflowX: 'hidden'  // Prevent horizontal scroll
     }}>
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
      <h2>Database Table View (24 columns)</h2>
      <div style={{ overflowX: "auto", padding: 24 }}>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              {Array.from({ length: 24 }).map((_, idx) => (
                <th key={idx}>Col {idx + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tables;