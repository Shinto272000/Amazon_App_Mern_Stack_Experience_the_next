import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';

axios.defaults.baseURL = '/api';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
