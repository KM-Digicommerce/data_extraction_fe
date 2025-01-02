import React from 'react';
import { Box, Grid, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Utility function to format keys to human-readable format
const formatKey = (key) => {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Function to split keys into two groups for two-column display
const splitKeysIntoTwoColumns = (keys) => {
  const midIndex = Math.ceil(keys.length / 2);
  const firstColumn = keys.slice(0, midIndex);
  const secondColumn = keys.slice(midIndex);
  return [firstColumn, secondColumn];
};

// Function to render form fields dynamically (Top-level keys)
const renderFormFields = (data) => {
  const excludedFields = Object.keys(data).filter(
    key => Array.isArray(data[key]) || typeof data[key] === 'object'
  );
  const topLevelKeys = Object.keys(data).filter(key => !excludedFields.includes(key));

  // Split the top-level keys into two columns
  const [firstColumn, secondColumn] = splitKeysIntoTwoColumns(topLevelKeys);

  return (
    <Grid container spacing={2}>
      {/* First Column */}
      <Grid item xs={12} sm={6}>
        {firstColumn.map((key) => {
          const value = data[key];
          const formattedKey = formatKey(key);

          return (
            <Box key={key} sx={{ marginBottom: 2 }}>
              <TextField
                label={formattedKey}
                value={value || 'N/A'}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { fontSize: '12px' },
                }}
                InputLabelProps={{ style: { fontSize: '12px' } }}
              />
            </Box>
          );
        })}
      </Grid>

      {/* Second Column */}
      <Grid item xs={12} sm={6}>
        {secondColumn.map((key) => {
          const value = data[key];
          const formattedKey = formatKey(key);

          return (
            <Box key={key} sx={{ marginBottom: 2 }}>
              <TextField
                label={formattedKey}
                value={value || 'N/A'}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { fontSize: '12px' },
                }}
                InputLabelProps={{ style: { fontSize: '12px' } }}
              />
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
};

// Function to render arrays of primitive values
const renderPrimitiveArray = (title, data) => {
  if (!data || data.length === 0) return null;

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '13px' }}
      >
        {formatKey(title)}
      </Typography>
      <Grid container spacing={2}>
        {data.map((value, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              label="Value"
              value={value || 'N/A'}
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: '12px' },
              }}
              InputLabelProps={{ style: { fontSize: '12px' } }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Function to render a table for nested data (arrays of objects)
const renderTable = (title, data) => {
  if (!data || data.length === 0) return null;

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '13px' }}
      >
        {formatKey(title)}
      </Typography>
      <TableContainer component={Paper} sx={{boxShadow:'none'}}>
        <Table sx={{borderTop:'1px solid lightgray'}}>
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((key, index) => (
                <TableCell
                  sx={{ fontWeight: 'bold', fontSize: '12px' }}
                  key={index}
                >
                  {formatKey(key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {Object.values(item).map((value, idx) => (
                  <TableCell key={idx} sx={{ fontSize: '12px' }}>
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Function to render nested fields (objects)
const renderNestedFields = (title, nestedData) => {
  if (!nestedData) return null;

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '13px' }}
      >
        {formatKey(title)}
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(nestedData).map((key, index) => {
          const value = nestedData[key];
          return (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                label={formatKey(key)}
                value={value || 'N/A'}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { fontSize: '12px' },
                }}
                InputLabelProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// Recursive function to dynamically render nested data
const renderDynamicData = (data) => {
  return Object.keys(data).map((key) => {
    const value = data[key];

    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        return renderTable(key, value);
      }
      return renderPrimitiveArray(key, value);
    }

    if (typeof value === 'object') {
      return renderNestedFields(key, value);
    }

    return null;
  });
};

// Main FormFieldsTab Component
const FormFieldsTab = ({ data }) => {
  if (!data) {
    return <Typography variant="body1" color="textSecondary">Data is not available yet.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Render form fields (Top-level keys) */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '13px' }}
      >
        Invoice Details
      </Typography>
      {renderFormFields(data)}

      {/* Render dynamic nested fields */}
      {renderDynamicData(data)}
    </Box>
  );
};

export default FormFieldsTab;
