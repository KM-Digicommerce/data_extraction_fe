// src\components\User\Invoice\invoice.js
import React, { useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone'; // For file upload functionality
import InvoicePreview from './InvoicePreview'; // Preview component
import InvoiceTabs from './InvoiceTabs'; // Tabs for extracted data

function Invoice() {
  const [files, setFiles] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);  // Mock extracted data
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle file upload
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    // Simulate data extraction from the first uploaded file
    const extractedData = { 
      invoiceNumber: "INV-12345", 
      date: "2024-12-01", 
      amount: "$350.00", 
      vendor: "ABC Corp" 
    };
    setInvoiceData(extractedData);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf, .png, .jpg, .jpeg',
    multiple: true,
  });

  return (
   
      <Grid container spacing={2}>
        {/* Left: Invoice Preview, Thumbnails, and Upload Option */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            {/* Invoice Preview and Thumbnails */}
            <InvoicePreview 
              files={files} 
              currentIndex={currentIndex} 
              setCurrentIndex={setCurrentIndex} 
            />

            {/* Upload Files Section */}
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed #1976d2',
                padding: 1,
                cursor: 'pointer',
                backgroundColor: '#f1f1f1',
                marginTop: 2,
                textAlign:'center'
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body2">Drag & Drop or Click to Upload Files/Folders</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right: Extracted Data Tabs */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            <InvoiceTabs invoiceData={invoiceData} />
          </Paper>
        </Grid>
      </Grid>
  
  );
}

export default Invoice;
