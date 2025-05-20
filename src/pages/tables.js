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
import TextField from '@mui/material/TextField'; // <-- Import
import Box from '@mui/material/Box';

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
  const [filters, setFilters] = useState(Array(columnTitles.length).fill(""));

  const navigate = useNavigate();

  useEffect(() => {
    fetchTableData().then(setData);
  }, []);

  // Filter logic
  const filteredData = data.filter(row =>
    row.every((cell, idx) =>
      filters[idx] === "" ||
      String(cell).toLowerCase().includes(filters[idx].toLowerCase())
    )
  );

  const handleFilterChange = (idx, value) => {
    const newFilters = [...filters];
    newFilters[idx] = value;
    setFilters(newFilters);
  };

  return (
    <Box sx={{ background: "#f4f6fa", minHeight: "100vh", p: 0 }}
    style={{ overflowX: 'hidden' }}>
      <header className='header' id="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
        }}>
        <div id="header-title" onClick={() => navigate('/home')}>
          <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png" alt="KIA logo"></img>
          <h1>mbiental</h1>
        </div>
        <div id="h2-group"
          style={{ marginRight: 24, display: 'flex', gap: '32px' }}>
          <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
        </div>
      </header>
      <Card sx={{ margin: 4, padding: 2, boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <h2 style={{ textAlign: 'center', marginBottom: 24, color: "#05141f" }}>
            Database Table View (24 columns)
          </h2>
          <div style={{ overflowX: "auto", padding: 24 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columnTitles.map((title, idx) => (
                      <TableCell
                        key={idx}
                        sx={{
                          fontWeight: 'bold',
                          background: '#05141f',
                          color: '#fff',
                          borderRight: '1px solid #e0e0e0',
                          position: 'relative'
                        }}
                      >
                        <span style={{ display: "block", marginBottom: 8 }}>{title}</span>
                        <TextField
                          variant="standard"
                          value={filters[idx]}
                          onChange={e => handleFilterChange(idx, e.target.value)}
                          placeholder="Filtrar"
                          size="small"
                          sx={{
                            background: "#fff",
                            borderRadius: 1,
                            width: "100%",
                            input: { fontSize: 13, p: 0.5 }
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        backgroundColor: i % 2 === 0 ? '#f9f9fb' : '#f4f6fa',
                        '&:hover': { backgroundColor: '#e3eafc' }
                      }}
                    >
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
    </Box>
  );
}

export default Tables;