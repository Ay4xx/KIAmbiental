import React, { useEffect, useState } from "react";

// Simulated fetch from database (replace with real API call)
const fetchTableData = async () => {
  // Generate 10 rows of 24 columns with sample data
  const rows = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 24; j++) {
      row.push(`R${i + 1}C${j + 1}`);
    }
    rows.push(row);
  }
  return rows;
};

function Tables() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTableData().then(setData);
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>Database Table View (24 columns)</h2>
      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              {Array.from({ length: 24 }).map((_, idx) => (
                <th key={idx}>Col {idx + 1}</th>
              ))}
            </tr>
          </thead>
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

export default Tables;