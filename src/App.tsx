import './App.css';
import { RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { router } from './routes/index.js';

import { LoadingProvider } from './context/LoadingContext';
import { SnackbarProvider } from './context/SnackbarContext';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </LoadingProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
