// src\components\User\Invoice\InvoicePreview.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function InvoicePreview({ files, currentIndex, setCurrentIndex, defaultFile }) {
  return (
    <Box >
      {files.length > 0 ? (
        <>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {files[currentIndex].name}
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <TransformWrapper defaultScale={1} wheel={{ step: 0.1 }} pinch={{ step: 0.1 }}>
              <TransformComponent>
                <img
                  src={URL.createObjectURL(files[currentIndex])}
                  alt="Invoice Preview"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', cursor: 'zoom-in' }}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        </>
      ) : (
        defaultFile && (
          <Box sx={{ marginBottom: 2 }}>
            <TransformWrapper defaultScale={1} wheel={{ step: 0.1 }} pinch={{ step: 0.1 }}>
              <TransformComponent>
                <img
                  src={defaultFile}
                  alt="Default Invoice"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', cursor: 'zoom-in' }}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        )
      )}
    </Box>
  );
}

export default InvoicePreview;
