import Notification from 'features/notifications/Notification';
import React from 'react';
import { useSelector } from 'react-redux';

const NotificationsContainer = () => {
  const notifications = useSelector(state => state.notifications.ids);

  return (
    <div className='notifications-container'>
      {notifications.map(id => (
        <Notification key={id} id={id} />
      ))}
    </div>
  );
};

export default NotificationsContainer;
