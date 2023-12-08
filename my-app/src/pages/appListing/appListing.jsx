import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { BACKENDHOST } from "../../config";
import Header from "../../components/Header/header";



const Apps = () => {
  const [apps, setApps] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

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
    <div>
      <p>{errorMessage}</p>
      {
        apps.map((app) => (
          <div key={app.application_id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">apply to pet :{app.pet}</h5>

              <div className="d-flex justify-content-between align-items-center">
                <span className={`mr-2` } style={{ color: 'black' }}>
                  {app.status}
                </span>
                <div>
                  <button className="btn btn-secondary ml-1 mr-2">
                    <NavLink className="nav-link" to={`/application-detail/${app.application_id}`}>
                      Detail
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
};

const containerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  marginLeft: "5cm",
  marginRight: "5cm",
  padding: "1cm",
  alignItems: "center",
  justifyContent: "space-evenly",
  overflowY: "auto",
};

export default AppRepo;