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
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Column titles for the 12 columns
const columnTitles = [
  "id",
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

// Fetch real data from backend
const fetchTableData = async () => {
  const res = await fetch("http://localhost:3001/api/residuos");
  const json = await res.json();
  // Return as array of arrays for compatibility with your filter logic
  return json.map(obj => columnTitles.map(col => obj[col]));
};

function Tables() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(Array(columnTitles.length).fill(""));

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch("http://localhost:3001/api/residuos", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        // Convierte cada objeto a un array alineado con columnTitles
        const rows = json.map(obj => columnTitles.map(col => obj[col]));
        setData(rows);
      });
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

  // Filtra los datos por residue_type seleccionado
  const [selectedResidueType, setSelectedResidueType] = useState("");

  // Obtén los residue_type únicos para el select
  const residueTypes = Array.from(new Set(data.map(row => row[2]))); // 2 es el índice de residue_type

  // Datos filtrados para exportar
  const exportData = filteredData.filter(row =>
    selectedResidueType === "" || row[2] === selectedResidueType
  );

  // Exportar a Excel
  const handleExportExcel = () => {
    // Create worksheet with headers and data
    const ws = XLSX.utils.aoa_to_sheet([columnTitles, ...exportData]);

    // Set column widths for better readability
    ws['!cols'] = columnTitles.map(() => ({ wch: 18 }));

    // Bold and center headers (works in most Excel viewers)
    columnTitles.forEach((col, idx) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: idx });
      if (!ws[cell]) ws[cell] = {};
      ws[cell].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center" },
        fill: { fgColor: { rgb: "1976D2" } }
      };
    });

    // Add autofilter
    ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: columnTitles.length - 1 } }) };

    // Freeze the header row
    ws['!freeze'] = { xSplit: 0, ySplit: 1 };

    // Create workbook and export
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Residuos");
    XLSX.writeFile(wb, `residuos_${selectedResidueType || "todos"}.xlsx`);
  };

  // Exportar a PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Residuos - ${selectedResidueType || "Todos"}`, 40, 40);

    autoTable(doc, {
      head: [columnTitles],
      body: exportData,
      startY: 60,
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [25, 118, 210], textColor: 255, fontStyle: 'bold', halign: 'center' },
      alternateRowStyles: { fillColor: [244, 246, 250] },
      margin: { left: 40, right: 40 },
      tableWidth: 'auto',
      didDrawPage: (data) => {
        doc.setFontSize(10);
        doc.text(`Fecha de exportación: ${new Date().toLocaleString()}`, 40, doc.internal.pageSize.height - 20);
      }
    });
    doc.save(`residuos_${selectedResidueType || "todos"}.pdf`);
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
          <h2>Lenguaje</h2>
        </div>
      </header>
      <Card sx={{ margin: 4, padding: 2, boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <h2 style={{ textAlign: 'center', marginBottom: 24, color: "#05141f" }}>
            Database Table View (24 columns)
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <label>
              Filtrar por residue_type:&nbsp;
              <select
                value={selectedResidueType}
                onChange={e => setSelectedResidueType(e.target.value)}
                style={{ padding: 4, borderRadius: 4 }}
              >
                <option value="">Todos</option>
                {residueTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <button onClick={handleExportExcel} style={{ padding: "6px 16px", borderRadius: 4, background: "#1976d2", color: "#fff", border: "none" }}>
              Descargar Excel
            </button>
            <button onClick={handleExportPDF} style={{ padding: "6px 16px", borderRadius: 4, background: "#e57373", color: "#fff", border: "none" }}>
              Descargar PDF
            </button>
          </div>
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