import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

function QuantitySumTransporter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch("http://localhost:3001/api/quantity-sum-by-transporter", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(result => {
        setData(result);
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
      width: '80vw'  // Make the card wider
    }}>
      <CardHeader title="Suma de cantidad por transportador" />
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <XAxis dataKey="transporter_name" />
          <YAxis dataKey="total_quantity"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="total_quantity" fill="#8884d8" />      
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default QuantitySumTransporter;