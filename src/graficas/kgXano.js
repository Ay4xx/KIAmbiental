import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { prueba2 } from '../pruebas/prueba2.js';


function KgXano() {

    const minWidthPerData = 80;
    const chartWidth = Math.max(minWidthPerData * prueba2.length, 600);

    return(
    <Card sx={{ width: chartWidth, 
    boxShadow: 5, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
        <CardHeader title="Kg de residuos por año" />
            <BarChart width={chartWidth} height={700} data={prueba2}>
            <Legend />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="waste_kg_2024" fill="#fdbfdb" name="2024"/>
            <Bar dataKey="waste_kg_2023" fill="#90caf9" name="2023" />
            </BarChart>
        </div>
    </Card>

)};

export default KgXano;