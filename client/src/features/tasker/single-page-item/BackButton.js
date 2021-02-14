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
  return (
    <div className='back-but'>
      <span onClick={handleClick}>X</span>
    </div>
  );
};

export default BackButton;
