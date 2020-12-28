import { removeNotification } from 'features/notifications/notificationSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notification = ({ id }) => {
  const { type, message } = useSelector(
    state => state.notifications.entities[id]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, 5000);
  }, [id, dispatch]);

  return (
    <div
      className={`notification notification-${type}`}
      onClick={() => dispatch(removeNotification(id))}
    >
      {message}
    </div>
  );
};

export default Notification;
