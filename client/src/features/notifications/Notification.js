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
    <div className={`notification ${type}`}>
      <div className='inner'>
        <div className='message'>
          <span className='icon'></span>
          <span className='text'>{message}</span>
        </div>
        <span
          className='close-button'
          onClick={() => dispatch(removeNotification(id))}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Notification;
