
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/header';
import Login from './pages/Login/LoginPage';
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
        {/* Optional: Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
