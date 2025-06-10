import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';


function Excels() {
  const [data, setData] = useState([]); // Datos en forma de arrays (filas)
  const [headers, setHeaders] = useState([]); // Encabezados extraídos del Excel
  const navigate = useNavigate();

  const { t } = useTranslation();

  // Mapea los encabezados del Excel a las claves que espera el backend.
  // Aquí solo se usa para mostrar la tabla en pantalla.
  const headerMap = {
    "DATE OF COLLECTION": "collection_date",
    "TYPE OF WASTE": "waste_type",
    "RESIDUE TYPE": "residue_type",
    "COMPANY (TRANSPORTING COMPANY)": "transporter_name",
    "COMPANY (PURCHASE AND SALE OF RECYCLABLES))": "purchase_name",
    "DISPOSAL SITE": "disposal_site",
    "ITEM": "area",
    "WEIGHT": "weight",
    "QUANTITY": "quantity",
    "UNIT": "unit",
    "REMISSION HMMX": "remission_hmmx",
    "REMISSION KIA": "remission_kia",
  };

  // Función para parsear fechas si se reciben en formato numérico (serial de Excel)
  function parseExcelDate(value) {
    if (typeof value === "number") {
      const date = new Date(Math.round((value - 25569) * 86400 * 1000));
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }
    if (typeof value === "string" && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(value)) {
      let [day, month, year] = value.split("/");
      if (year.length === 2) {
        year = Number(year) < 50 ? "20" + year : "19" + year;
      }
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }
    return value;
  }

  // Lee el archivo y extrae la información
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
      // Supongamos que la fila 4 (índice 3) contiene los encabezados
      const excelHeaders = jsonData[3] || [6];
      console.log("Encabezados leídos del Excel:", excelHeaders);
      setHeaders(excelHeaders);
      // Los datos empiezan en la fila 5 (índice 4)
      const filteredData = jsonData.slice(4).map(row => {
        // Opcional: Parsear la fecha en la primera columna si corresponde
        if (row[0]) {
          row[0] = parseExcelDate(row[0]);
        }
        return row;
      });
      setData(filteredData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Función que envía de una sola vez todas las filas leídas al backend
  const handleUploadClick = async () => {
    if (data.length === 0) {
      alert("No hay datos para subir. Asegúrate de cargar un archivo.");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch("http://localhost:3001/api/excel-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        // Se envía todo el array de datos en la propiedad "data"
        body: JSON.stringify({ data: data })
      });
      if (response.ok) {
        const resData = await response.json();
        alert(`Se subieron ${resData.mensaje}`);
      } else {
        alert("Error al subir los datos.");
      }
    } catch (error) {
      console.error("Error al subir los datos:", error);
      alert("Error al subir los datos.");
    }
  };

  // Si no existen headers se muestra columnas por número
  const displayHeaders = headers.length > 0 ? headers : data.length > 0 ? data[0].map((_, i) => `Columna ${i + 1}`) : [];

  return (
    <div id="Excels" style={{ padding: 0, overflowX: 'hidden' }}>
      <header className="header" id="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
        }}>
        <div id="header-title" onClick={() => navigate('/home')}>
          <img className="KIAphoto" id="KIAphoto" src="./new-kia-logo-white.png" alt="KIA logo" />
          <h1>mbiental</h1>
        </div>
        <div id="h2-group" style={{ marginRight: 24, display: 'flex', gap: '32px' }}>
          <h2 style={{
            position: 'relative', 
            top: 6, 
            cursor: 'pointer', 
            fontSize: '1rem', 
            fontWeight: 500, 
            fontFamily: 'Formula1-Regular' }
          } onClick={() => navigate('/perfil')}>Perfil</h2>
          <LanguageSelector 
          style={
            { display: 'flex', alignItems: 'center', cursor: 'pointer' }
          }/>
        </div>
      </header>

      <Box sx={{ p: 3, background: "#f0f2f5", minHeight: "100vh" }}>
        <Card sx={{ maxWidth: "95vw", mx: "auto", boxShadow: 6 }}>
          <CardHeader title={t('excels.title')} />
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
              onClick={handleUploadClick}
            >
              {t('excels.button')}
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