import React from 'react';
import { Typography, Box } from '@mui/material';

const JsonTab = ({ data }) => {
  return (
    <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: 2, borderRadius: 1 }}>
      <Typography variant="body1">
        {data ? JSON.stringify(data, null, 2) : 'No data available'}
      </Typography>
    </Box>
  );
};

export default JsonTab;
