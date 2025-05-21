import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  Card, CardHeader, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

function Excels() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const navigate = useNavigate();

function parseExcelDate(value) {
  // Si es número (serial de Excel)
  if (typeof value === "number") {
    // Excel's day 0 is 1899-12-30
    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  // Si es string en formato D/M/YY, D/M/YYYY, DD/MM/YYYY, etc.
  if (typeof value === "string" && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(value)) {
    let [day, month, year] = value.split("/");
    if (year.length === 2) {
      year = Number(year) < 50 ? "20" + year : "19" + year;
    }
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  }

  // Si no es fecha, regresa igual
  return value;
}


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const arrayBuffer = evt.target.result;
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
      console.log ("json dta",jsonData);
      // Usa la cuarta línea como encabezados
      const excelHeaders = jsonData[3] || [];
      setHeaders(excelHeaders);

      // Los datos empiezan en la quinta línea (índice 4)
      const filteredData = jsonData.slice(4).map(row => {
        row[1] = parseExcelDate(row[1]);
        return row;
      });
      setData(filteredData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to send data to backend
  const uploadToDatabase = async (excelData) => {
    console.log ("otro", JSON.stringify({ data: excelData }));
    try {
      const response = await fetch("/api/excel-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: excelData })
      });
      if (response.ok) {
        alert("Datos subidos correctamente a la base de datos.");
      } else {
        alert("Error al subir los datos.");
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    }
  };

  // Optional: Extract headers if present
  const displayHeaders = headers.length > 0 ? headers : data.length > 0 ? data[0].map((_, i) => `Columna ${i + 1}`) : [];

  return (

  <div id='Excels'
  style={{ padding: 0, overflowX: 'hidden' }}>
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
        style={{marginRight: 24, display: 'flex', gap: '32px'}}>
          <h2 onClick={() => navigate('/perfil')}>Perfil</h2>
          <h2>Opciones</h2>
          <h2>Lenguaje</h2>
        </div>
    </header>

    <Box sx={{ p: 3, background: "#f0f2f5", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: "95vw", mx: "auto", boxShadow: 6 }}>
        <CardHeader title="Selecciona una bitacora para subir a la base de datos" />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <button
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "10px 24px",
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}
            onClick={() => uploadToDatabase(data)}
          >
            Subir datos a la base de datos
          </button>
        </Box>
        <Box sx={{ p: 2 }}>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            {displayHeaders.length > 0 && (
              <TableHead>
                <TableRow>
                  {displayHeaders.map((header, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: "bold", background: "#e0e0e0" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i} sx={{ background: i % 2 === 0 ? "#fafafa" : "#f0f0f0" }}>
                  {row.map((cell, j) => (
                    <TableCell key={j}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  </div>
  );
}

export default Excels;