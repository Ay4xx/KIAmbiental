import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


// Column titles for the 24 columns
const columnTitles = [
  "ID",
  "collection_date",
  "residue_type",
  "transporter_name",
  "disposal_site",
  "waste_type",
  "area",
  "weight",
  "quantity",
  "unit",
  "remission_number",
  "manifest_number",
];

// Simulated fetch from database (replace with real API call)
const fetchTableData = async () => {
  // Generate 10 rows of 24 columns with sample data
  const rows = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 12; j++) {
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
    <div style={{ padding: 0, overflowX: 'hidden' }}>
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
          style={{ marginRight: 24, display: 'flex', gap: '32px' }}>
          <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
        </div>
      </header>
      <Card sx={{ margin: 4, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Database Table View (24 columns)</h2>
          <div style={{ overflowX: "auto", padding: 24 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columnTitles.map((title, idx) => (
                      <TableCell key={idx} sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>{title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow key={i} sx={{ backgroundColor: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                      {row.map((cell, j) => (
                        <TableCell key={j}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Tables;