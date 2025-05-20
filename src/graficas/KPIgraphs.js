import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { prueba5 } from '../pruebas/prueba5.js';


function KPIgraph() {

    const minWidthPerData = 80;
    const chartWidth = Math.max(minWidthPerData * prueba5.length, 600);

    return(
    <Card sx={{ width: chartWidth, 
    boxShadow: 5, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
        <CardHeader title="KPI" />
            <BarChart width={chartWidth} height={700} data={prueba5}>
            <Legend />
            <XAxis dataKey="metric_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#fdbfdb" name="2024"/>
            </BarChart>
        </div>
    </Card>

)};

export default KPIgraph;