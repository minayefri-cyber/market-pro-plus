import React from 'react';
import ReactDOM from 'react-dom/client';
import { MarketApp } from './App';
import { CartProvider } from './context/CartContext';
import { HistoryProvider } from './context/HistoryContext'; // Add this
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HistoryProvider> {/* Wrap everything in HistoryProvider first */}
      <CartProvider>
        <MarketApp />
      </CartProvider>
    </HistoryProvider>
  </React.StrictMode>
);