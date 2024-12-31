// src\components\User\Invoice\invoice.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import InvoicePreview from './InvoicePreview';
import InvoiceTabs from './InvoiceTabs';

function Invoice() {
  const [files, setFiles] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [defaultFile, setDefaultFile] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSampleInvoiceData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_IP}getSampleInvoice/`);
      const { sample_file_data } = response.data.data;
      setDefaultFile(`data:${sample_file_data.file_format};base64,${sample_file_data.input_file}`);
      setInvoiceData(sample_file_data.extracted_data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSampleInvoiceData();
  }, []);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf, .png, .jpg, .jpeg',
    multiple: true,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ padding: 2 }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', padding: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <InvoicePreview
              files={files}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              defaultFile={defaultFile}
            />
          )}
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #1976d2',
              padding: 1,
              cursor: 'pointer',
              backgroundColor: '#f1f1f1',
              marginTop: 2,
              textAlign: 'center',
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body2">Drag & Drop or Click to Upload Files/Folders</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 2 }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', padding: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <InvoiceTabs invoiceData={invoiceData} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Invoice;
