import React from 'react';
import { Box, Typography, ImageList, ImageListItem } from '@mui/material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function InvoicePreview({ files, currentIndex, setCurrentIndex }) {
  return (
    <Box>
      {files.length > 0 && (
        <>
          {/* File name display */}
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {files[currentIndex].name}
          </Typography>

          {/* Main Invoice Display with Zoom functionality */}
          <Box sx={{ marginBottom: 2 }}>
            <TransformWrapper
              defaultScale={1}
              wheel={{ step: 0.1 }} // Controls zoom speed on mouse wheel
              pinch={{ step: 0.1 }} // Controls zoom speed on pinch gestures
            >
              <TransformComponent>
                <img
                  src={URL.createObjectURL(files[currentIndex])}
                  alt="Invoice Preview"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', cursor: 'zoom-in' }}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>

          {/* Thumbnails of other invoices */}
          <ImageList sx={{ display: 'flex', gap: 1 }} cols={4}>
            {files.map((file, index) => (
              <ImageListItem key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentIndex(index)} // Change main image on thumbnail click
                  style={{
                    cursor: 'pointer',
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: currentIndex === index ? '2px solid #1976d2' : 'none',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </Box>
  );
}

export default InvoicePreview;
