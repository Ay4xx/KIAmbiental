import React, { useState } from "react";
import * as XLSX from "xlsx";

function Excels() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
      // Skip the first 3 rows
      setData(jsonData.slice(3));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Display Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div style={{ marginTop: 24, overflowX: "auto" }}>
        <table border="1" cellPadding="8">
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Excels;