import React from 'react';
import AppRoutes from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create the theme with your custom primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#A34498", // Your custom primary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>  {/* Apply the theme here */}
      <CssBaseline /> {/* Ensure consistent baseline styling */}
      <AppRoutes /> {/* Your app's routes */}
    </ThemeProvider>
  );
}

export default App;
