import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.js';

import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </>
  );
}

export default App;
