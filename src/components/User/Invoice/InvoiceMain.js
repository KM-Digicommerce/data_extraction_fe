// src\components\User\Invoice\InvoiceMain.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Box, CircularProgress, Button, Snackbar, Alert } from '@mui/material';
import InvoicePreview from './InvoicePreview';
import InvoiceTabs from './InvoiceTabs';
import InvoiceThumbnails from './InvoiceThumbnails';
import { Document, Page, pdfjs } from 'react-pdf';
import InvoiceUpload from './InvoiceUpload'
import InvoiceExport from './InvoiceExport';
import Fetch from './fetch';

// Set up PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Invoice() {
  const [files, setFiles] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the active file index
  const [defaultFile, setDefaultFile] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [success, setSuccess] = useState(null);
  const [sampleInvoiceData, setSampleInvoiceData] = useState(null);
  const [thumbnails, setThumbnails] = useState([]); // Store the thumbnails for uploaded files
  const [isSampleFile, setIsSampleFile] = useState(true); // Track whether the sample file or uploaded file is active

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchSampleInvoiceData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_IP}getSampleInvoice/`);
      const { sample_file_data } = response.data.data;
      setDefaultFile(`data:${sample_file_data.file_format};base64,${sample_file_data.input_file}`);
      setSampleInvoiceData(sample_file_data.extracted_data);
      // setSampleInvoiceData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch sample invoice data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSampleInvoiceData();
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const supportedFormats = [
      'application/pdf', 'image/png', 'image/jpeg', 'image/jpg',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    let totalSize = 0;

    for (const file of uploadedFiles) {
      if (!supportedFormats.includes(file.type)) {
        setSnackbarMessage(`Unsupported format: ${file.name}`);
        setShowSnackbar(true);
        return;
      }
      totalSize += file.size;
      if (totalSize > 10 * 1024 * 1024) { // 10 MB limit
        setSnackbarMessage('Total upload size exceeds 10MB');
        setShowSnackbar(true);
        return;
      }
    }

    setFiles(uploadedFiles);
    generateThumbnails(uploadedFiles);

    // Set the first uploaded file as the active one
    setIsSampleFile(false);
    setCurrentIndex(0); // Set the active file to the first uploaded one
  };

  const generateThumbnails = (uploadedFiles) => {
    const thumbnailsArray = uploadedFiles.map((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnails((prevThumbnails) => [...prevThumbnails, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (files.length === 0) {
      setError('Please select a file to upload.');
      return;
    }

    if (!user?.id) {
      setError('User ID not found.');
      return;
    }

    const formData = new FormData();
    formData.append('invoice_files', files[0]); // Use files[0] if you only want to upload one file
    formData.append('user_id', user.id);

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IP}upload/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // On successful upload, update the invoiceData
      // setInvoiceData(response.data.data);
      setInvoiceData(response.data.data.all_extracted_data[0]);
      setSuccess('File uploaded successfully!');
    } catch (err) {
      setError('Failed to upload the file.');
    } finally {
      setLoading(false);
    }
  };

  return (

    // <Fetch />

    <Box>
     <Box>
     <Typography variant="caption" color="error" sx={{ display: 'block' , textAlign:'right' , fontSize:'9px' , marginBottom:'3px'}}>
      ! Supported formats:PNG, JPG, JPEG. Max size: 10MB.
      </Typography>
     </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setShowSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* File Upload Section */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' , mb:2}}>
        <Box>
          <InvoiceExport />
        </Box>
        <Box>
        <InvoiceUpload
          handleFileUpload={handleFileUpload}
          handleSubmit={handleSubmit}
          files={files}
          snackbarMessage={snackbarMessage}
          showSnackbar={showSnackbar}
          setShowSnackbar={setShowSnackbar}
        />
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 ,  maxHeight: '75vh'}}>
            {loading ? (
              <Box sx={{ textAlign: 'center', padding: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <InvoicePreview
                  files={files}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  defaultFile={defaultFile}
                  isSampleFile={isSampleFile}
                  sampleInvoiceData={sampleInvoiceData}
                />
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            {loading ? (
              <Box sx={{ textAlign: 'center', padding: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <InvoiceTabs invoiceData={invoiceData || sampleInvoiceData} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Invoice;
