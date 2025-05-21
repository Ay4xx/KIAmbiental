import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { prueba3 } from '../pruebas/prueba3.js'; // Import the prueba3 data

import React, { useEffect, useState } from 'react';

function WastetypeBYarea() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/waste-type-by-area") // Cambia esta ruta por la de tu API real
        .then(res => res.json())
        .then(setData)
        .catch(() => setData([]));
    }, []);

    const minWidthPerData = 80;
    const chartWidth = Math.max(minWidthPerData * data.length, 600);

    return(
    <Card sx={{ width: chartWidth, 
    boxShadow: 5, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
        <CardHeader title="Tipo de residuo por area" />
            <BarChart width={chartWidth} height={700} data={data}>
            <Legend />
            <XAxis dataKey="area" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Iodo" fill="red" name="Iodo" />
            <Bar dataKey="Uretano_vidrio_plastico" fill="#90caf9" name="Uretano, vidrio, plastico" />
            </BarChart>
        </div>
    </Card>

)};

export default WastetypeBYarea;