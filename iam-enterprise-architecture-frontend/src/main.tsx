import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "./style.css"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
