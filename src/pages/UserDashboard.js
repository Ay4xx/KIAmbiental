import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [resumen, setResumen] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setError("No token encontrado. Por favor inicia sesión.");
      return;
    }

    axios.get('http://localhost:3001/api/resumen-mensual', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setResumen(response.data.data); // <- acceder a `data` dentro de la respuesta
    })
    .catch(error => {
       console.error("Error al obtener resumen:", error.response?.data || error.message);
       setError("Hubo un error al obtener los datos del resumen mensual.");
    });
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!resumen.length) return <p>Cargando datos del resumen mensual...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h2>Resumen mensual de residuos</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tipo de residuo</th>
            <th>Residuo</th>
            <th>Área</th>
            <th>Cantidad</th>
            <th>Peso</th>
            <th>Unidad</th>
          </tr>
        </thead>
        <tbody>
          {resumen.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{new Date(item.collection_date).toLocaleDateString()}</td>
              <td>{item.waste_type}</td>
              <td>{item.residue_type}</td>
              <td>{item.area}</td>
              <td>{item.quantity}</td>
              <td>{item.weight}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
