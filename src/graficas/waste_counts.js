import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

function WasteCounts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch("http://localhost:3001/api/waste-counts", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(result => {
        const processed = result.map(item => ({
          ...item,
          count_total: Number(item.count_total)
        }));
        setData(processed);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching porcentaje residuos:", error);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <Card style={{ 
      margin: '20px', 
      padding: '10px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      width: '50vw'  // Make the card wider
    }}>
      <CardHeader title="Contador de tipos de residuos" />
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <XAxis dataKey="waste_type" />
          <YAxis domain={[0, 'dataMax']} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count_total" fill="#05141f" />      
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default WasteCounts;