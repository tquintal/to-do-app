import React from 'react';
import ReactDOM from 'react-dom/client';
import { StorageContextProvider } from './context/storage-context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StorageContextProvider>
    <App />
  </StorageContextProvider>
);
