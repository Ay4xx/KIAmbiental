import { useEffect, useState } from "react";
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
//traductor
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';

// Column titles for residue_logs
const residueLogsColumns = [
  "id",
  "collection_date",
  "transporter_name",
  "disposal_site",
  "waste_type",
  "area",
  "weight",
  "quantity",
  "unit",
  "remission_hmmx",
  "remision_kia",
  "purchase_name",
  "item"
];

// Column titles for residue_authorizations
const residueAuthColumns = [
  "id",
  "residue_id",
  "folio",
  "date",
  "time",
  "requester_name",
  "company",
  "department",
  "origin",
  "destination",
  "reason",
  "material_type",
  "container_type",
  "description",
  "tara",
  "gross_weight",
  "net_weight",
  "quantity",
  "license_plate",
  "economic_number",
  "authorized_by",
  "authorization_date",
  "file_name"
  // file_data is omitted for display
];

// Fetch data for residue_logs
const fetchResidueLogs = async (token) => {
  const res = await fetch("http://localhost:3001/api/residuos", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  return json.map(obj => residueLogsColumns.map(col => obj[col]));
};

// Fetch data for residue_authorizations
const fetchResidueAuth = async (token) => {
  const res = await fetch("http://localhost:3001/api/residue_authorizations", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  return json.map(obj => residueAuthColumns.map(col => obj[col]));
};

function Tables() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [columns, setColumns] = useState(residueLogsColumns);
  const [selectedTable, setSelectedTable] = useState("residue_logs");

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch data when table changes
  useEffect(() => {
    const fetchData = async () => {
      if (selectedTable === "residue_logs") {
        setColumns(residueLogsColumns);
        setFilters(Array(residueLogsColumns.length).fill(""));
        setData(await fetchResidueLogs(token));
      } else {
        setColumns(residueAuthColumns);
        setFilters(Array(residueAuthColumns.length).fill(""));
        setData(await fetchResidueAuth(token));
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [selectedTable]);

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
  const residueTypes = Array.from(new Set(data.map(row => row[4]))); // 2 es el índice de residue_type

  // Datos filtrados para exportar
  const exportData = filteredData.filter(row =>
    selectedResidueType === "" || row[4] === selectedResidueType
  );

  // Exportar a Excel
  const handleExportExcel = () => {
    // Create worksheet with headers and data
    const ws = XLSX.utils.aoa_to_sheet([columns, ...exportData]);

    // Set column widths for better readability
    ws['!cols'] = columns.map(() => ({ wch: 18 }));

    // Bold and center headers (works in most Excel viewers)
    columns.forEach((col, idx) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: idx });
      if (!ws[cell]) ws[cell] = {};
      ws[cell].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center" },
        fill: { fgColor: { rgb: "1976D2" } }
      };
    });

    // Add autofilter
    ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } }) };

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
      head: [columns],
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
      <Card sx={{ margin: 4, padding: 2, boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <h2 style={{ textAlign: 'center', marginBottom: 24, color: "#05141f" }}>
            {t('tables.title')}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <label>
              {t('tables.table_select')}:&nbsp;
              <select
                value={selectedTable}
                onChange={e => setSelectedTable(e.target.value)}
                style={{ padding: 4, borderRadius: 4 }}
              >
                <option value="residue_logs">{t('tables.table_name1')}</option>
                <option value="residue_authorizations">{t('tables.table_name2')}</option>
              </select>
            </label>
            {selectedTable === "residue_logs" && (
              <label>
                {t('tables.filtro')}:&nbsp;
                <select
                  value={selectedResidueType}
                  onChange={e => setSelectedResidueType(e.target.value)}
                  style={{ padding: 4, borderRadius: 4 }}
                >
                  <option value="">{t('tables.todos')}</option>
                  {residueTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </label>
            )}
            <button onClick={handleExportExcel} style={{ padding: "6px 16px", borderRadius: 4, background: "#1976d2", color: "#fff", border: "none" }}>
              {t('tables.excel')}
            </button>
            <button onClick={handleExportPDF} style={{ padding: "6px 16px", borderRadius: 4, background: "#e57373", color: "#fff", border: "none" }}>
              {t('tables.pdf')}
            </button>
          </div>
          <div style={{ overflowX: "auto", padding: 24 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((title, idx) => (
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
                          value={filters[idx] || ""}
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
                  {data.filter(row =>
                    row.every((cell, idx) =>
                      filters[idx] === "" ||
                      String(cell).toLowerCase().includes(filters[idx].toLowerCase())
                    )
                  ).map((row, i) => (
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