// src\components\User\Invoice\InvoiceTabs.js
import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

function InvoiceTabs({ invoiceData }) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="invoice data tabs">
        <Tab label="Raw Data" />
        <Tab label="JSON" />
        <Tab label="Form Fields" />
      </Tabs>

      <Box sx={{ paddingTop: 2 }}>
        {selectedTab === 0 && (
          <Typography variant="body1">
            <strong>Invoice Number:</strong> {invoiceData?.invoiceNumber}
            <br />
            <strong>Date:</strong> {invoiceData?.date}
            <br />
            <strong>Amount:</strong> {invoiceData?.amount}
            <br />
            <strong>Vendor:</strong> {invoiceData?.vendor}
          </Typography>
        )}
        {selectedTab === 1 && (
          <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
        )}
        {selectedTab === 2 && (
          <Typography variant="body1">
            {/* Display form fields if available */}
            Form fields will be displayed here.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default InvoiceTabs;
