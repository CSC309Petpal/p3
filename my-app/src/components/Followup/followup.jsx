import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { BACKENDHOST } from "./config";



function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if(secondsPast < 60) {
    return parseInt(secondsPast) + ' seconds ago';
  }
  if(secondsPast < 3600) {
    return parseInt(secondsPast / 60) + ' minutes ago';
  }
  if(secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + ' hours ago';
  }
  if(secondsPast > 86400) {
    const day = parseInt(secondsPast / 86400);
    return day + ' day' + (day !== 1 ? 's' : '') + ' ago';
  }
}



const Followups = (appId) => {
  const [followups, setFollowups] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState('');
  const create = async (content,appId) => {
    var FollowupData = new FormData();
    var notification = document.getElementById('notification');
    if (content === "") {
      notification.innerHTML = "Please fill in the field";
      notification.style.color = "red";
      return;
    }
    notification.innerHTML = "";
    FollowupData.append("content",content)
    try {
      const response = await fetch(`${BACKENDHOST}followup/to-app/${appId.appId}/`, {
        method: 'POST',
        body: FollowupData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        // Handle non-2xx responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();

  
      notification.innerHTML = "&check; ";
      notification.style.color = "green";
      refreshList();
  
    } catch (error) {
      console.error(error);
      notification.innerHTML = "Error creating followup";
      notification.style.color = "red";
    }
    
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

  const refreshList = () => {


    axios
      .get(`${BACKENDHOST}followup/to-app/${appId.appId}/?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        setFollowups(res.data.results);
        
        setPages(Math.ceil(res.data.count/5));
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
  useEffect(() => {
    refreshList();
  }, [page]);

  console.log(followups);

  return (
    <div className="row justify-content-center">
      <p>{errorMessage}</p>
      <div className="row justify-content-center">
        <div className="card mb-3">
         
            <div className="card-body">
              <h5 className="card-title">Add new Followup</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className={`mr-2`}>
                  <input
                    name="followup content"
                    id="content"
                    value={content}
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </span>
                <div>
                  <label
                    className="is-block mb-2 ml-2"
                    style={{ fontSize: "15px" }}
                    id="notification"
                  ></label>
                </div>
                <button
                  className="btn btn-secondary ml-1 is-link"
                  type="register"
                  value="Create new followup"
                  id="propertyLocation"
                  onClick={() => create(content, appId)}
                  readOnly
                >
                  followup
                </button>
              </div>
            </div>
          
        </div>
        {followups.map((followup) => (
          <div className="card mb-3" key={followup.id}>
            
              <div className="card-body" >
                <h5 className="card-title">Sender: {followup.senderusername}</h5>
                <div className="d-flex justify-content-between align-items-center">
                <span className={`mr-2`} style={{ color: 'black' }}>{followup.content}</span>

                  <div>
                  <span style={{ color: 'black' }}>{timeAgo(followup.created)}</span>
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



export default Followups;
