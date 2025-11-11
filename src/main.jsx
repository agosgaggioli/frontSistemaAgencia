import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { VehiculoProvider } from './context/vehiculo.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
      <VehiculoProvider>
           <App />
      </VehiculoProvider>
   
    </BrowserRouter>
  </StrictMode>
)
