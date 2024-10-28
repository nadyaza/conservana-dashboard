import React from 'react';
import { createRoot } from 'react-dom/client'; // Perhatikan impor baru
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Buat root baru
root.render(<App />);
