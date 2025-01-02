// src/components/User/Invoice/RawDataTab.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const RawDataTab = ({ data }) => {
  // Check if data is null or undefined
  if (!data) {
    return <Typography variant="body1" color="textSecondary">Data is not available yet.</Typography>;
  }

  // Utility function to format the key names
  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')        // Replace underscores with spaces
      .split(' ')                // Split by spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ');                // Join them back with spaces
  };

  // Function to render objects and arrays properly
  const renderValue = (value, isTopLevel = false) => {
    if (value === null || value === undefined) {
      return <Typography variant="body2" color="textSecondary">N/A</Typography>;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <Box>
          {Object.keys(value).length > 0 ? (
            Object.keys(value).map((subKey) => (
              <Box key={subKey} sx={{ marginBottom: 1 }}>
                <Typography variant="body2">
                  {subKey}: {value[subKey]}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No data available</Typography>
          )}
        </Box>
      );
    }

    if (Array.isArray(value)) {
      return (
        <Box>
          {value.length > 0 ? (
            value.map((item, index) => (
              <Box key={index} sx={{ marginBottom: 1 }}>
                {typeof item === 'object' ? renderValue(item) : <Typography variant="body2">{item}</Typography>}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No items available</Typography>
          )}
        </Box>
      );
    }

    return (
      <Typography variant="body2">
        {isTopLevel ? `Value : ${value}` : value}
      </Typography>
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      {Object.keys(data).map((key) => {
        const value = data[key];
        return (
          <Box key={key} sx={{ marginBottom: 2 , backgroundColor:'#d3d3d340' , padding:'10px'}}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              {formatKey(key)} {/* Format the key name */}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {renderValue(value, true)} {/* Pass true to mark this as top-level key */}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default RawDataTab;