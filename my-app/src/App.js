
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/header';
import Login from './pages/Login/LoginPage';

import RegisterShelter from './pages/RegisterShelter';
import RegisterSeeker from './pages/RegisterSeeker';

import SeekerDetail from './pages/Accounts/SeekerDetail';
import PetCreationForm from './pages/Pet/PetCreatePage';
import ShelterComponent from './pages/ShelterManage';
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register-shelter" element={<RegisterShelter />} />
        <Route path="/register-seeker" element={<RegisterSeeker />} />


        <Route path="/seeker-detail" element={<SeekerDetail />} />
        <Route path="/shelter/:shelterId" element={<ShelterComponent />} />
        <Route path="/pet/create" element={< PetCreationForm/>} />

        {/* Add more routes as needed */}
        {/* Optional: Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
