import React, { useState, useEffect } from 'react';

function NotificationList() {
  // const [notifications, setNotifications] = useState([]);
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   fetch(`https://your-backend.com/notifications?page=${page}`)
  //     .then(response => response.json())
  //     .then(data => setNotifications(data.notifications));
  // }, [page]);

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id}>
          <h2>{notification.title}</h2>
          <p>{notification.message}</p>
        </div>
      ))}
      <button onClick={() => setPage(page + 1)}>
        Load More
      </button>
    </div>
  );
}

export default NotificationList;