import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { prueba } from '../pruebas/prueba.js';


function CantidadXarea() {
    const minWidthPerData = 80;
    const chartWidth = Math.max(minWidthPerData * prueba.length, 600);

    return(
    <Card sx={{ width: chartWidth, 
    boxShadow: 5, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' }}>
        <CardHeader title="Cantidad de residuos por área" />          
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <BarChart width={chartWidth} height={500} data={prueba}>
            <Legend />
            <XAxis dataKey="department" />
            <YAxis dataKey="waste_kg" />
            <Tooltip />
            <Bar dataKey="waste_kg" fill="#fdbfdb" />
            </BarChart>
            </div>
    </Card>

)};

export default CantidadXarea;