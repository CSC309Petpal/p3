import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { BACKENDHOST } from "./config";

// const comment_info = async (comment_name) => {
//   var commentData = new FormData();
//   var notification = document.getElementById('notification');

//   if (comment_content === "") {
//     notification.innerHTML = "Please fill in the field";
//     notification.style.color = "red";
//     return;
//   }

//   notification.innerHTML = "";

//   locationData.append('content', comment_content);
//   try {
//     const response = await fetch(`${BACKENDHOST}comment/to-shelter//`, {
//       method: 'POST',
//       body: locationData,
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     if (!response.ok) {
//       // Handle non-2xx responses
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     const location_id = data.location_id;

//     notification.innerHTML = "&check; Property created successfully";
//     notification.style.color = "green";
//   } catch (error) {
//     console.error(error);
//     notification.innerHTML = "Error creating location";
//     notification.style.color = "red";
//   }
// };

const Comments = (shelterId) => {
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

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
    console.log(shelterId);

    axios
      .get(`${BACKENDHOST}comments/to-shelter/${shelterId.shelterId}/?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        setComments(res.data.results);
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
  useEffect(() => {
    refreshList();
  }, [page]);

  return (
    <div>
      <p>{errorMessage}</p>
      {
        comments.map((comment) => (
          <div key={comment.comment_id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{comment.sender}</h5>

              <div className="d-flex justify-content-between align-items-center">
                <span className={`mr-2`}>
                  {comment.content}
                </span>
                
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={prevPage} disabled={page === 1}>Previous</button>
      <span>Page {page} of {pages}</span>
      <button className="btn btn-primary" onClick={nextPage} disabled={page === pages}>Next</button>
    </div>
  );
};

// const LocationRepo = () => {
//   const [locationName, setLocationName] = useState("");

//   return (
//     <div>
//       <div style={containerStyle}>
//         <div className="card mb-3">
//           <div className="card-body">
//             <h5 className="card-title">Add new location</h5>
//             <div className="d-flex justify-content-between align-items-center">
//               <span className={`todo-title mr-3`} name="add new">
//                 <div className="mr-2">new location name:</div>
//                 <input name='Location Name' id='locationName' value={locationName} type='text' onChange={(e) => setLocationName(e.target.value)} />
//                 <div>
//                   <label className="is-block mb-2 ml-2" style={{ fontSize: "15px" }} id="notification"> </label>
//                 </div>
//               </span>

//               <div className="column block has-text-centered">
//                 <button className="btn btn-secondary ml-1 is-link" type="register" value="Create new location" id="propertyLocation" onClick={() => location_info(locationName)} readOnly>
//                   Create new location
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//         <Locations />
//       </div>
//     </div>
//   );
// };


export default Comments;
