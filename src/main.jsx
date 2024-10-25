import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '98.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDetail from './Components/WeatherDetail.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/" element={<App />} />
        <Route path="/weatherDetails/:dt" element={<WeatherDetail/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
