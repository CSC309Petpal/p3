import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { BACKENDHOST } from "../../config";
import Header from "../../components/Header/header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer";


const Apps = () => {
  const [apps, setApps] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/application-detail/${id}`);
  };

  const refreshList = () => {
    axios
      .get(`${BACKENDHOST}applications/?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        setApps(res.data.results);
        setPages(Math.ceil(res.data.count/10));
        setErrorMessage('');
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage('You are not logged in. Redirecting to login page...');
          setTimeout(() => {
            window.location.href = "/landing";
          }, 500);
        } else {
          console.error(err);
        }
      });
  };
  const prevPage = () => {
    if (page > 1) {
    setPage(page - 1);
    }
};

const nextPage = () => {
    if (page < pages) {
    setPage(page + 1);
    }
};


  useEffect(() => {
    refreshList();
  }, []);

  return (

    <div className="container-fluid ms-lg-5 align-items-center justify-content-center">
      <p>{errorMessage}</p>
      <div className="row d-flex flex-column align-items-center">
      {
        apps.map((app) => (
          <div key={app.application_id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'black' }}>apply to pet :{app.petname}</h5>

              <div className="d-flex justify-content-between align-items-center">
              <span className={`mr-2` } style={{ color: 'black' }}>
                  {app.seekername}'s apply to {app.sheltername}
                </span>
                <span className={`mr-2` } style={{ color: 'black' }}>
                  {app.status}
                </span>
                <div>
                  <button className="btn btn-secondary ml-1 mr-2" onClick={()=>handleDetail(app.id)}>
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
   
         <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-primary"
          onClick={prevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {pages}</span>
        <button
          className="btn btn-primary"
          onClick={nextPage}
          disabled={page === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const AppRepo = () => {

  return (
    
    <div>
        <Header />

      <div style={containerStyle}>
        
        <Apps />
      </div>
      <Footer />
    </div>
  );
};

const containerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  marginLeft: "0cm",
  marginRight: "0cm",
  padding: "1cm",
  alignItems: "center",
  justifyContent: "space-evenly",
  overflowY: "auto",
};

export default AppRepo;