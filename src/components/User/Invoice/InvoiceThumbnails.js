import React from 'react';
import { Box, Typography } from '@mui/material';

function InvoiceThumbnails({ files = [], thumbnails = [], setCurrentIndex, defaultFile, currentIndex, setActiveThumbnailIndex }) {
  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      {/* Display Sample Invoice Thumbnail */}
      <Box onClick={() => { setCurrentIndex(0); setActiveThumbnailIndex(0); }}>
        {defaultFile && (
          <img
            src={defaultFile}
            alt="Sample Invoice Thumbnail"
            style={{
              width: '50px', height: '50px', cursor: 'pointer', borderRadius: '8px', border: currentIndex === 0 ? '2px solid blue' : '1px solid black'
            }}
          />
        )}
      </Box>

      {/* Display Thumbnails of Uploaded Files */}
      {thumbnails.length > 0 &&
        thumbnails.map((thumbnail, index) => (
          <Box key={index} onClick={() => { setCurrentIndex(index + 1); setActiveThumbnailIndex(index + 1); }}>
            <img
              src={thumbnail}
              alt={`Uploaded Invoice ${index + 1}`}
              style={{
                width: '50px', height: '50px', cursor: 'pointer', borderRadius: '8px', border: currentIndex === index + 1 ? '2px solid blue' : '1px solid black'
              }}
            />
          </Box>
        ))}
    </Box>
  );
}

export default InvoiceThumbnails;
