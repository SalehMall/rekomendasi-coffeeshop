import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Halaman Depan */}
        <Route path="/" element={<LandingPage />} />
        {/* Halaman Peta Aplikasi */}
        <Route path="/map" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)