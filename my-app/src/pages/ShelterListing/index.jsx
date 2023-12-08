import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { BACKENDHOST } from "../../config";
import img from '../../assets/avatar.jpg';

function to_url_params(object) {
    const params = new URLSearchParams();
    for (const key in object) {
        if (Array.isArray(object[key])) {
            object[key].forEach(value => params.append(`${key}[]`, value));
        } else {
            params.append(key, object[key]);
        }
    }
    return params.toString();
}

const ShelterListing = () => {
    
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(1);
    const [shelters, setShelters] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleDetail = (id) => {
        navigate(`/shelter/${id}`);
    }

    const query = useMemo(() => ({
        page: parseInt(searchParams.get('page') ?? 1),
    }), [searchParams]);


    useEffect(() => {
      const params = to_url_params(query);
      const token = localStorage.getItem('token');
      fetch(`${BACKENDHOST}accounts/shelter/?${params}`, {
        method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
        headers: {
          'Authorization': `Bearer ${token}`,
          // other headers...
        },
      })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setShelters(data.results);
              const totalPages = Math.ceil(data.count / 4);
              setTotalPages(totalPages);
          })
          .catch(error => console.error('Error fetching shelters:', error));
  }, [query]);

    return (
      <>
      <Header />
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
    <div className="pagination d-flex justify-content-center" style={{ width: '100%' }}>
    <button 
        disabled={query.page <= 1} 
        onClick={() => setSearchParams({ ...query, page: query.page - 1 })}
        className="btn btn-secondary m-1"
    >
        Previous
    </button>
    <button 
        disabled={query.page >= totalPages} 
        onClick={() => setSearchParams({ ...query, page: query.page + 1 })}
        className="btn btn-secondary m-1"
    >
        Next
    </button>
    <p className="m-1">Page {query.page} out of {totalPages}.</p>
</div>
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
      <div className="container">
            {shelters.map((shelter, index) => (
                <div key={index} className="row">
                <div className="d-flex justify-content-center">
                    <div className="card d-flex flex-row align-items-center" style={{ width: '100%' }}> {/* Flex row for horizontal layout */}
                        <div className="m-3"> {/* Margin for spacing */}
                            <img style={{ height: '100px', width: '100px', borderRadius: '50px' }} 
                                 src={shelter && shelter.avatar ? shelter.avatar : img} 
                                 alt={`Shelter ${index + 1}`} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{shelter.username}</h5>
                            <p className="card-text">email: {shelter.email}</p>
                            <p className="card-text">location: {shelter.location}</p>
                            <button className="btn btn-primary" onClick={() => handleDetail(shelter.id)}>View Details</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            ))}
         
      </div>
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
      <Footer />
  </>
    );
};

export default ShelterListing;
