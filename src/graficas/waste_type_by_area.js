import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useEffect, useState } from 'react';

function WastetypeBYarea() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch("http://localhost:3001/api/residuos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log("Respuesta del backend:", json); // <-- Agrega esto
            const grouped = {};
            json.forEach(item => {
                const area = item.area || "Sin área";
                const waste = item.waste_type || "Sin tipo";
                if (!grouped[area]) grouped[area] = {};
                grouped[area][waste] = (grouped[area][waste] || 0) + 1;
            });
            const chartData = Object.entries(grouped).map(([area, wastes]) => ({
                area,
                ...wastes
            }));
            setData(chartData);
        })
        .catch((err) => {
            console.error("Error en el fetch:", err);
            setData([]);
        });
    }, [token]); // <-- Agrega token aquí

    console.log("Datos para la gráfica:", data);

    if (data.length === 0) {
        return <div style={{textAlign: "center", marginTop: 40}}>No hay datos para mostrar.</div>;
    }

    const minWidthPerData = 80;
    const chartWidth = Math.max(minWidthPerData * data.length, 600);

    // Antes del return, calcula todos los tipos únicos de waste_type:
    const allWasteTypes = Array.from(
        new Set(
            data.flatMap(obj => Object.keys(obj).filter(key => key !== "area"))
        )
    );

    return (
        <Card sx={{
            width: chartWidth,
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{ overflowX: 'auto', width: '100%' }}>
                <CardHeader title="Tipo de residuo por area" />
                <BarChart width={chartWidth} height={700} data={data}>
                    <Legend />
                    <XAxis dataKey="area" />
                    <YAxis />
                    <Tooltip />
                    {allWasteTypes.map((waste, idx) => (
                        <Bar
                            key={waste}
                            dataKey={waste}
                            fill={["#1976d2", "#90caf9", "#e57373", "#81c784", "#ffd54f"][idx % 5]}
                            name={waste}
                        />
                    ))}
                </BarChart>
            </div>
        </Card>
    );
}

export default WastetypeBYarea;