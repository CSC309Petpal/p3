import React , { useEffect }from 'react';
import axios from 'axios';

import { BACKENDHOST } from "./config";

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
import ShelterUpdateForm from './pages/ShelterUpdate';

import NotificationBoard from './components/Notification/notificationBoard';
import PetListing from './pages/PetListing';
import PetUpdateForm from './pages/PetUpdate';


import Landing from './pages/Landing/landing';


function App() {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const data = {
          refresh: localStorage.getItem('refresh'),
        };
        const response = await axios.post(`${BACKENDHOST}api/token/refresh/`, data);

        localStorage.setItem('token', response.data.access);

        console.log('token refreshed')
      } catch (error) {
        console.error(error);
        console.log('token refresh failed')
        // Handle token refresh failure, e.g. redirect to login page
      }
    }, 4 * 60 * 1000);
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <BrowserRouter>
      
      <Routes>

        <Route path="/landing" element={<Landing />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register-shelter" element={<RegisterShelter />} />
        <Route path="/register-seeker" element={<RegisterSeeker />} />
        <Route path="/shelter/update/:shelterId" element={<ShelterUpdateForm />} />


        <Route path="/seeker-detail" element={<SeekerDetail />} />
        <Route path="/shelter/:shelterId" element={<ShelterComponent />} />
        <Route path="/pet/create" element={< PetCreationForm/>} />
        <Route path="/pet" element={<PetListing />} />
        <Route path="/pet/update/:petId" element={<PetUpdateForm />} />


        <Route path="/notifications" element={< NotificationBoard/>} />

        {/* Add more routes as needed */}
        {/* Optional: Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
