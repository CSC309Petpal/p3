import React, { useState, useEffect } from 'react';
import "./style.css";
import testImage from "./personal-icon-4.jpg";
import {BACKENDHOST} from "../../config.jsx"
import { useNavigate, Link } from "react-router-dom";

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

const markAsRead = (notification_id) => {
  fetch(`${BACKENDHOST}notifications/${notification_id}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

function NotificationBoard() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState('-creation_time');
  const [read, setRead] = useState('');
  const nagivate = useNavigate;
  const pages = Math.ceil(notifications.count/5);

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

    const handleReadChange = (event) => {
      setRead(event.target.value);
      setPage(1);
    };
  
    const toggleOrdering = () => {
      setOrdering(ordering === 'creation_time' ? '-creation_time' : 'creation_time');
      setPage(1);
    };

  const deleteNotification = (notification_id) => {
    fetch(`${BACKENDHOST}notifications/${notification_id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }else{
        setNotifications(prevNotifications => ({
          ...prevNotifications,
          results: prevNotifications.results.filter(notification => notification.id !== notification_id)
        }));
        if (notifications.results.length === 1) {
          window.location.reload();
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    let url = `${BACKENDHOST}notifications?page=${page}`;
    if (ordering) {
      url += `&ordering=${ordering}`;
    }
    if (read !== '') {
      url += `&read=${read}`;
    }

    fetch(url,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                nagivate('/login');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } else {
            return response.json();
        }
    })
      .then(data => {
        setNotifications(data);
        console.log(data);
    });
  }, [page, ordering, read]);

  return (
    <div className="notification-board d-flex flex-column align-items-center">
        <div className="notificaiton-text">
            <h1>Notification</h1>
        </div>
        <div className="filters d-flex">
          <select value={read} onChange={handleReadChange} className='form-select form-select-sm' >
            <option value="">All</option>
            <option value="true">Read</option>
            <option value="false">Unread</option>
          </select>
          <button onClick={toggleOrdering} className='btn btn-secondary'>
            {ordering === 'creation_time' ? 'Oldest First' : 'Newest First'}
          </button>
        </div>
        {notifications.count == 0 && <h5 className="no-message-notification">You do not have any notifications Right now</h5>}
        {notifications.results && notifications.results.map(notification => (
            <div key={notification.id} className={`card notification-card message-card ${notification.read ? 'grey-background' : ''}`}>
                <div className="card-body d-flex flex-row justify-content-center">
                    <div className="notification-img">
                        <img src={notification.sender_avatar} alt="Shelter" width="75px" height="75px" />
                    </div>
                    <div className="message-content d-flex flex-column">
                        <p><b>Message From: </b> {notification.sender_name}</p>
                        <p className="text-muted">{notification.message}</p>
                        <p className="text-muted notification-time"><small>{timeAgo(notification.creation_time)}</small></p>
                        {notification.type === 'message' && <Link to={`/application-detail/${notification.application}`} className="btn btn-primary" onClick={() => markAsRead(notification.id)}>Go to conversation</Link>}
                        {notification.type === 'status_update' && <Link to={`/application-detail/${notification.application}`} className="btn btn-primary" onClick={() => markAsRead(notification.id)}>Go to Application</Link>}
                        {notification.type === 'new_pet_listings' && <Link to={`/pet/${notification.pet}`} className="btn btn-primary" onClick={() => markAsRead(notification.id)}>Go to Pet Listing</Link>}
                        {notification.type === 'new_review' && <Link to={`/shelter/${notification.receiver}#Comments`} className="btn btn-primary" onClick={() => markAsRead(notification.id)}>Go to Reviews</Link>}
                        {notification.type === 'new_application' && <Link to={`/application-detail/${notification.application}`} className="btn btn-primary" onClick={() => markAsRead(notification.id)}>Go to Application</Link>}
                        <button className="btn btn-danger" onClick={() => deleteNotification(notification.id)}>Delete</button>
                    </div>
                </div>
            </div> 
         ))}

        <div className="pagination-bar">
            <button className="btn btn-primary" onClick={prevPage} disabled={page === 1}>Previous</button>
            <span>Page {page} of {pages}</span>
            <button className="btn btn-primary" onClick={nextPage} disabled={page === pages}>Next</button>
        </div>
    </div>
  );
}

export default NotificationBoard;