import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Grid, Typography } from '@mui/material';

function ExportDropdown() {
  const [format, setFormat] = useState('select'); // Default format is JSON

  const handleChange = (event) => {
    const selectedFormat = event.target.value;
    setFormat(selectedFormat);
    // handleExport(selectedFormat);
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="body1" sx={{marginRight: '5px'}}>Preferred Output Format : </Typography>
      </Grid>
      <Grid item>
        <FormControl variant="outlined" fullWidth>
        <Select
        value={format}
        onChange={handleChange}
        sx={{
            '.MuiSelect-select': {
              paddingTop: '4px', // Adjust top padding
              paddingBottom: '4px', // Adjust bottom padding
            },
          }}
      >
        <MenuItem value="select" disabled>Choose</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="excel">Excel</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
      </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default ExportDropdown;
