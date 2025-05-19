import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { prueba4 } from '../pruebas/prueba4.js';


function TransportCoBYwasteType() {
    const minWidthPerData = 80;
    const chartWidth = Math.max(minWidthPerData * prueba4.length, 600);

    return(
    <Card sx={{ width: chartWidth, 
    boxShadow: 5, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' }}>
        <CardHeader title="Cantidad de residuos por área" />          
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <BarChart width={chartWidth} height={500} data={prueba4}>
            <Legend />
            <XAxis dataKey="transportCo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Iodo" fill="blue" />
            <Bar dataKey="UAV" fill="red" />
            <Bar dataKey="metallic_nonmetallic" fill="green" />
            <Bar dataKey="recycables" fill="yellow" />
            </BarChart>
            </div>
    </Card>

)};

export default TransportCoBYwasteType;