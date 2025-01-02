import React from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';

function FileUpload({
  handleFileUpload,
  handleSubmit,
  files,
  snackbarMessage,
  showSnackbar,
  setShowSnackbar,
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

      
      <Box>
        <Button variant="outlined" component="label" sx={{fontSize:'12px'}}>
          Choose File
          <input
            type="file"
            // multiple
            hidden
            onChange={handleFileUpload}
            accept=".png,.jpg,.jpeg"
          />
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 2 , fontSize:'12px'}}
          onClick={handleSubmit}
          disabled={files.length === 0}
        >
          Upload
        </Button>
       
      </Box>
    </Box>
  );
}

export default FileUpload;
