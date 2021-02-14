import ConfirmationPopupComponent from 'common/ConfirmationPopupComponent';
import { checkOffTaskerItem } from 'features/api/checkOffTaskerItem';
import { toggleEditing } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const TaskerItemControls = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className='tasker-item-controls'>
      <button
        onClick={() => dispatch(checkOffTaskerItem(id))}
        className='btn check-off'
      >
        <span></span>
        Check off
      </button>
      <button onClick={() => dispatch(toggleEditing())} className='btn s edit'>
        <span></span>
      </button>
      <ConfirmationPopupComponent
        render={handleClick => (
          <button onClick={handleClick} className='btn s delete'>
            <span></span>
          </button>
        )}
      ></ConfirmationPopupComponent>
    </div>
  );
};

export default TaskerItemControls;
