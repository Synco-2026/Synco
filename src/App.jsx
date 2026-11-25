import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HRDashboard from './pages/HRDashboard';
import UserDashboard from './pages/UserDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para el Dashboard del usuario */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        {/* Ruta para el Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para el Dashboard */}
        <Route path="/dashboard" element={<HRDashboard />} />
        
        {/* Si entran a la raíz, los manda al login por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}