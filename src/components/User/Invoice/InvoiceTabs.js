// C:\KM-Projects\invoice-de\src\components\User\Invoice\InvoiceTabs.js
import React from 'react';
import { Box, Tab, Tabs , Typography } from '@mui/material';
import RawDataTab from './RawDataTab';
import JsonTab from './JsonTab';
import FormFieldsTab from './FormFieldsTab';

function InvoiceTabs({ invoiceData }) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
     

      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="invoice data tabs">
        <Tab label="JSON" />
        <Tab label="Raw Data" />
        <Tab label="Form Fields" />
      </Tabs>

      <Box
        sx={{
          paddingTop: 2,
          maxHeight: '60vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px', // Adjust the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.main', // Customize the color of the scrollbar thumb
            borderRadius: '10px', // Add rounded corners to the thumb
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1', // Color of the track (background of the scrollbar)
          },
        }}
      >

        {selectedTab === 0 && <JsonTab data={invoiceData} />}
        {selectedTab === 1 && <RawDataTab data={invoiceData} />}
        {selectedTab === 2 && <FormFieldsTab data={invoiceData} />}
      </Box>
    </Box>
  );
}

export default InvoiceTabs;
