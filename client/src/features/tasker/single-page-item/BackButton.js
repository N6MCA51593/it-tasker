import { cancelChanges, toggleActiveItem } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const BackButton = ({ isEditing }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (isEditing) {
      dispatch(cancelChanges());
    } else {
      dispatch(toggleActiveItem());
    }
  };
  return <div className='back nav-btn' onClick={handleClick}></div>;
};

export default BackButton;
