import React, { useState, useEffect } from 'react';
import "./style.css";
import testImage from "./personal-icon-4.jpg";
import {BACKENDHOST} from "../../config.jsx"

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

function NotificationBoard() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${BACKENDHOST}notifications?page=${page}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
      .then(response => response.json())
      .then(data => setNotifications(data));
  }, [page]);

//   console.log(response);
  console.log(notifications);

  return (
    <div className="notification-board d-flex flex-column align-items-center">
        <div className="notificaiton-text">
            <h1>Notification</h1>
        </div>
        {notifications.results.map(notification => (
            <div className="card notification-card message-card">
                <div className="card-body d-flex flex-row justify-content-center">
                    <div className="notification-img">
                        <img src={testImage} alt="Shelter" width="75px" height="75px" />
                    </div>
                    <div className="message-content d-flex flex-column">
                        <p><b>Message From: </b> PetLover23</p>
                        <p className="text-muted">{notification.message}.</p>
                        <p className="text-muted notification-time"><small>{timeAgo(notification.creation_time)}</small></p>
                        <a href="chat_shelter.html" className="btn btn-primary">Go to conversation</a>
                    </div>
                </div>
            </div> 
         ))}
    </div>
  );
}

export default NotificationBoard;