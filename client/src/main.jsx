import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AistationProvider } from './context/AistationProvider';

ReactDOM.createRoot(document.getElementById('root')).render(

  <AistationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AistationProvider>
)
