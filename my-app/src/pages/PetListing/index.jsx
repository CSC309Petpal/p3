import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { BACKENDHOST } from "../../config";

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

const PetListing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(1);
    const [pets, setPets] = useState([]);
    const [shelters, setShelters] = useState([]);
    const [currentShelter, setCurrentShelter] = useState(1);
    const [totalShelter, setTotalShelter] = useState(0);

    const query = useMemo(() => ({
        page: parseInt(searchParams.get('page') ?? 1),
        gender: searchParams.get('gender') ?? '',
        shelter: searchParams.get('shelter') ?? '',
        status: searchParams.get('status') ?? '',
        size: searchParams.get('size') ?? '',
        ordering: searchParams.get('ordering') ?? 'name',
    }), [searchParams]);

    useEffect(() => {
        const params = to_url_params(query);
        fetch(`${BACKENDHOST}pets/?${params}`)
            .then(response => response.json())
            .then(data => {

                if (data.results.length === 0) {
                    setPets([]);
                }else{
                  setPets(data.results);
                }
                const totalPages = Math.ceil(data.count / 6);
                setTotalPages(totalPages);
            })
            .catch(error => console.error('Error:', error));
    }, [query]);

    const handleDetail = (id) => {
        navigate(`/pet/${id}`);
    };
    

    useEffect(() => {
      const token = localStorage.getItem('token');
      const fetchShelters = async () => {
        const response = await fetch(`${BACKENDHOST}accounts/shelter?page=${currentShelter}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setShelters(data.results);
        let totalShelter = data.count / 4;
        setTotalShelter(totalShelter);
    };

    fetchShelters();

        
  }, [currentShelter]);

    return (
      <>
      <Header />
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
      <div className="container">
          <div className="row">
              {/* Filter and Sorting Options - Left Side */}
              <div className="col-md-3">
                  <div className="side-panel mb-3">
                  <h4>Pages</h4>
                  <div className="pagination d-flex justify-content-center" style={{ width: '100%' }}>
                  <div>
                    <button 
                        disabled={query.page <= 1} 
                        onClick={() => setSearchParams({ ...query, page: query.page - 1 })}
                        className="btn btn-secondary m-1"
                    >
                        Previous Page
                    </button>
                    <button 
                        disabled={query.page >= totalPages} 
                        onClick={() => setSearchParams({ ...query, page: query.page + 1 })}
                        className="btn btn-secondary m-1"
                    >
                        Next Page
                    </button>
                    <p className="m-1">Page {query.page} out of {totalPages}.</p>
                    </div>
                </div>
                <hr className="my-4 border-primary" />
                      {/* Filter by Shelter */}
                      <div className="filter-group">
                          <h4>Filter by Shelter:</h4>
                          <div className="container mt-3">
                            <div className="row">
                                <div className="col">
                                    <select className="form-select">
                                        {shelters.map(shelter => (
                                            <option key={shelter.id} value={shelter.id}>{shelter.username}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <div className="col-auto">
                                    <button 
                                        className="btn btn-outline-primary me-2" 
                                        onClick={() => setCurrentShelter(prev => prev - 1)} 
                                        disabled={currentShelter <= 1}
                                    >
                                        Previous
                                    </button>
                                    <button 
                                        className="btn btn-outline-primary" 
                                        onClick={() => setCurrentShelter(prev => prev + 1)} 
                                        disabled={currentShelter >= totalShelter}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            </div>
                      </div>
                      <hr className="my-4 border-primary" />
  
                      {/* Filter by Size */}      
                      <div className="filter-group">
                      <h4>Filter by Size:</h4>
                      <div onChange={(e) => setSearchParams({ ...query, size: e.target.value, page: 1 })}>
                          <input type="radio" value="" name="size" id="sizeAll" defaultChecked />
                          <label htmlFor="sizeAll">All Sizes</label><br/>

                          <input type="radio" value="small" name="size" id="sizeSmall" />
                          <label htmlFor="sizeSmall">Small</label><br/>

                          <input type="radio" value="medium" name="size" id="sizeMedium" />
                          <label htmlFor="sizeMedium">Medium</label><br/>

                          <input type="radio" value="large" name="size" id="sizeLarge" />
                          <label htmlFor="sizeLarge">Large</label><br/>

                          <input type="radio" value="extra_large" name="size" id="sizeExtraLarge" />
                          <label htmlFor="sizeExtraLarge">Extra Large</label>
                      </div>
                      </div>

                      <hr className="my-4 border-primary" />

                      <div className="filter-group">
                      <h4>Filter by Status:</h4>
                      <div onChange={(e) => setSearchParams({ ...query, status: e.target.value, page: 1 })}>
                          <input type="radio" value="available" name="status" id="statusAvailable" defaultChecked />
                          <label htmlFor="statusAvailable">Available</label><br/>

                          <input type="radio" value="adopted" name="status" id="statusAdopted" />
                          <label htmlFor="statusAdopted">Adopted</label><br/>

                          <input type="radio" value="foster" name="status" id="statusFoster" />
                          <label htmlFor="statusFoster">Foster</label><br/>

                      </div>
                      </div>

                      <hr className="my-4 border-primary" />

                      <div className="filter-group">
                      <h4>Filter by Gender:</h4>
                      <div onChange={(e) => setSearchParams({ ...query, gender: e.target.value, page: 1 })}>

                          <input type="radio" value="" name="gender" id="genderAll" defaultChecked />
                          <label htmlFor="genderAll">All</label><br/>
                          
                          <input type="radio" value="male" name="gender" id="genderMale" defaultChecked />
                          <label htmlFor="genderMale">Male</label><br/>

                          <input type="radio" value="female" name="gender" id="genderFemale" />
                          <label htmlFor="genderFemale">Female</label><br/>

                          <input type="radio" value="unknown" name="gender" id="genderUnknown" />
                          <label htmlFor="genderUnknown">Unknown</label><br/>

                      </div>
                      </div>

                      <hr className="my-4 border-primary" />
  
                      {/* Order By */}
                      <div className="filter-group">
                          <h4>Order By:</h4>
                          <select className="form-select" onChange={(e) => setSearchParams({ ...query, ordering: e.target.value, page: 1 })}>
                              <option value="size">Size: from large to small</option>
                              <option value="-size">Size: from small to large</option>
                              <option value="age">Age: from low to high</option>
                              <option value="-age">Age: from high to low</option>
                          </select>
                      </div>
                      <hr className="my-4 border-primary" />

                  </div>
              </div>
  
              {/* Pet Cards - Right Side */}
              <div className="col-md-9">
                  <div className="row">
                      {pets.map((pet, index) => (
                          <div key={index} className="col-md-4">
                              <div className="card">
                                  <img src={pet.image} className="card-img-top fixed-img" alt={`Pet ${index + 1}`} />
                                  <div className="card-body">
                                      <h5 className="card-title">{pet.name}</h5>
                                      <p className="card-text">status: {pet.status}</p>
                                      <p className="card-text">size: {pet.size}</p>
                                      <p className="card-text">gender: {pet.gender}</p>
                                      <p className="card-text">age: {pet.age}</p>
                                   
                                      <button className="btn btn-primary" onClick={() => handleDetail(pet.id)}>View Details</button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                  {/* Pagination */}
              </div>
          </div>
      </div>
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
      <Footer />
  </>
    );
};

export default PetListing;
