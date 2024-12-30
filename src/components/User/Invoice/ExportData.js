// src\components\User\Invoice\ExportData.js
import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import { generateCsv } from 'export-to-csv'; // Corrected import for CSV export

export function ExportCsv({ data }) {
  const handleExport = () => {
    const options = {
      filename: 'invoice_data',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, // Show column names
      useTextFile: false,
      useBOM: true, // Use BOM for Excel compatibility
      headers: Object.keys(data), // Use object keys as headers
    };

    // Generate CSV data and download it
    generateCsv(data, options);
  };

  return <Button onClick={handleExport}>Export as CSV</Button>;
}

export function ExportExcel({ data }) {
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet([data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoice Data');
    XLSX.writeFile(wb, 'invoice_data.xlsx');
  };

  return <Button onClick={handleExport}>Export as Excel</Button>;
}
