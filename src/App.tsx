import './App.css';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/index.js';

import { LoadingProvider } from './context/LoadingContext';
import { SnackbarProvider } from './context/SnackbarContext';

function App() {
  return (
    <>
      <LoadingProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
