import React , { useEffect }from 'react';
import axios from 'axios';

import { BACKENDHOST } from "./config";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/LoginPage';
import ApplicationCreateForm from './pages/Applications/ApplicationCreation';
import ApplicationDetail from "./pages/ApplicationsDetail/ApplicationDetail"
import Apprepo from './pages/appListing/appListing';

import RegisterShelter from './pages/RegisterShelter';
import RegisterSeeker from './pages/RegisterSeeker';
import NotFound from './pages/Error/NotFound';
import NoAccessPage from './pages/Error/NoAccess';

import PetCreationForm from './pages/Pet/PetCreatePage';
import PetDetail from './pages/PetDetail';
import ShelterDetail from './pages/ShelterDetail';

import ShelterListing from './pages/ShelterListing';
import ShelterComponent from './pages/ShelterManage';
import ShelterUpdateForm from './pages/ShelterUpdate';
import SeekerUpdateForm from './pages/SeekerUpdate';

// import NotificationBoard from './components/Notification/notificationBoard';
import NotificationPage from './pages/Notification/NotificationPage';
import PetListing from './pages/PetListing';
import PetUpdateForm from './pages/PetUpdate';
import SeekerDetail from './pages/SeekerDetail';
import BlogCreate from './pages/BlogCreate';
import BlogDetail from './pages/BlogDetail';
import BlogListing from './pages/BlogList';


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
    }, 1 * 60 * 1000);
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <BrowserRouter>
      
      <Routes>

        <Route path="/landing" element={<Landing />} />
        
        
        <Route path="/login" element={<Login />} />
        <Route path="/register-shelter" element={<RegisterShelter />} />
        <Route path="/register-seeker" element={<RegisterSeeker />} />
        
        <Route path="/shelter/update" element={<ShelterUpdateForm />} />
        <Route path="/shelter/:shelterId" element={<ShelterDetail />} />

        <Route path="/seeker/update/:seekerId" element={<SeekerUpdateForm />} />

        <Route path="/shelters" element={<ShelterListing />} />
        <Route path="/blog/shelter/:shelterId" element={<BlogListing />} />


        <Route path="/application-create/:pet_id" element={<ApplicationCreateForm/>}/>
        <Route path="/application-detail/:application_id" element={<ApplicationDetail/>}/>
        <Route path="/applications" element={<Apprepo/>}/>
        <Route path="/blog/:blogId" element={<BlogDetail />} />
        

        <Route path="/seeker/:seekerId" element={<SeekerDetail />} />
        <Route path="/shelterHome" element={<ShelterComponent />} />
        <Route path="/pet/create" element={< PetCreationForm/>} />
        <Route path="/pet" element={<PetListing />} />
        <Route path="/pet/:petId" element={<PetDetail />} />
        <Route path="/pet/update/:petId" element={<PetUpdateForm />} />

        <Route path="/blog/create" element={<BlogCreate />} />
        

        <Route path="/notifications" element={< NotificationPage/>} />
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/noaccess" element={<NoAccessPage/>}/>
        {/* Add more routes as needed */}
        {/* Optional: Default route */}
        <Route path="/" element={<Navigate to="/landing" />} />
      
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
