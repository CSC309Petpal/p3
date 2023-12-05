
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/header';
import Login from './pages/Login/LoginPage';
import SeekerDetail from './pages/Accounts/SeekerDetail';
import ShelterDetail from './pages/Accounts/ShelterDetail';
import PetCreationForm from './pages/Pet/PetCreatePage';
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/seeker-detail" element={<SeekerDetail />} />
        <Route path="/shelter-detail" element={<ShelterDetail />} />
        <Route path="/pet/create" element={< PetCreationForm/>} />
        {/* Add more routes as needed */}
        {/* Optional: Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
