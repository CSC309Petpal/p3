// PetListingPage.js
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/footer';
import PetCards from '../../components/PetCards/petCards';
import SidePanel from '../../components/SidePanel/sidePanel';
import StartHeader from '../../components/StartHeader/startHeader';
import { BACKENDHOST } from '../Login/config';

function PetListing() {
  const [sortOption, setSortOption] = useState('');
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets based on the sort option
    const fetchPets = async () => {
      try {
        const response = await fetch(`${BACKENDHOST}/pets?ordering=${sortOption}`);
        const data = await response.json();
        setPets(data.results); // Assuming the response is the array of pets
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, [sortOption]);

  return (
    <>
    <div className="bg-pink d-flex flex-column min-vh-100">
      <StartHeader />
      <div className="container mt-lg-5 mb-xl-5">
        <div className="row">
          <div className="col-md-3">
          <SidePanel setSortOption={setSortOption} />
            </div>
            <div className="col-md-9">
          <PetCards pets={pets} />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default PetListing;
