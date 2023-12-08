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



const Comments = (shelterId) => {
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState('');
  const create = async (content,shelterId) => {
    var CommentData = new FormData();
    var notification = document.getElementById('notification');
    if (content === "") {
      notification.innerHTML = "Please fill in the field";
      notification.style.color = "red";
      return;
    }
    notification.innerHTML = "";
    CommentData.append("content",content)
    try {
      const response = await fetch(`${BACKENDHOST}comments/to-shelter/${shelterId.shelterId}/`, {
        method: 'POST',
        body: CommentData,
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
      notification.innerHTML = "Error creating comment";
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
      .get(`${BACKENDHOST}comments/to-shelter/${shelterId.shelterId}/?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        setComments(res.data.results);
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

  return (
    <div className="row justify-content-center">
      <p>{errorMessage}</p>
      <div className="row justify-content-left">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add new Comment</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className={`mr-2`}>
                  <input
                    name="comment content"
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
                  value="Create new comment"
                  id="propertyLocation"
                  onClick={() => create(content, shelterId)}
                  readOnly
                >
                  comment
                </button>
              </div>
            </div>
          </div>
        </div>
        {comments.map((comment) => (
          <div className="col-md-4" key={comment.comment_id}>
            <div className="card">
              <div className="card-body" >
                <h5 className="card-title">SenderId: {comment.sender}</h5>
                <div className="d-flex justify-content-between align-items-center">
                <span className={`mr-2`} style={{ color: 'black' }}>{comment.content}</span>

                  <div>
                  <span style={{ color: 'black' }}>{timeAgo(comment.created)}</span>
                  </div>
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



export default Comments;
