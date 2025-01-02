// src\components\User\Invoice\InvoicePreview.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function InvoicePreview({ files = [], currentIndex = 0, setCurrentIndex, defaultFile, isSampleFile, sampleInvoiceData }) {
  const hasFiles = files.length > 0;

  return (
    <Box>
      {isSampleFile ? (
        // Show the preview of sample invoice data
        <>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Sample Invoice
          </Typography>
          <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent:'center', backgroundColor: 'black' }}>
            <TransformWrapper defaultScale={1} wheel={{ step: 0.1 }} pinch={{ step: 0.1 }}>
              <TransformComponent>
                <img
                  src={defaultFile}
                  alt="Sample Invoice"
                  style={{ width: '100%', height: '400px', cursor: 'zoom-in' }}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        </>
      ) : (
        // Show the preview of uploaded invoice files
        hasFiles && files[currentIndex] && (
          <>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              {files[currentIndex].name}
            </Typography>
            <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent:'center', backgroundColor: 'black' }}>
              <TransformWrapper defaultScale={1} wheel={{ step: 0.1 }} pinch={{ step: 0.1 }}>
                <TransformComponent>
                  <img
                    src={URL.createObjectURL(files[currentIndex])}
                    alt="Invoice Preview"
                    style={{ width: '100%', height: '400px', cursor: 'zoom-in' }}
                  />
                </TransformComponent>
              </TransformWrapper>
            </Box>

          </>
        )
      )}
      {!hasFiles && !defaultFile && (
        <Typography variant="body2" color="textSecondary">
          No preview available.
        </Typography>
      )}
    </Box>
  );
}

export default InvoicePreview;
