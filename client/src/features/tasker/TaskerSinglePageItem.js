import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleActiveItem, toggleEditing } from 'features/tasker/taskerSlice';
import DeviceList from 'features/tasker/DeviceList';
import TaskerItemTextEditables from 'features/tasker/TaskerItemTextEditables';
import ConfirmationPopUp from 'common/ConfirmationPopUp';
import useConfirmationPopUp from 'common/useConfirmationPopUp';
import { removeTaskerItem } from 'features/api/removeTaskerItem';

const TaskerSinglePageItem = ({ id, isEditing }) => {
  const dispatch = useDispatch();
  const { isShowing, togglePopUp } = useConfirmationPopUp();

  return (
    <div className='collection-single-page'>
      <TaskerItemTextEditables id={id} />
      <DeviceList id={id} />
      {!isEditing && (
        <button onClick={() => dispatch(toggleEditing())}>Edit</button>
      )}
      {!isEditing && (
        <div>
          <button onClick={() => togglePopUp()}>Delete</button>
          {isShowing && (
            <ConfirmationPopUp
              handleConfirmation={() => dispatch(removeTaskerItem(id))}
              togglePopUp={togglePopUp}
            />
          )}
        </div>
      )}
      {!isEditing && (
        <button onClick={() => dispatch(toggleActiveItem())}>Back</button>
      )}
    </div>
  );
};

export default TaskerSinglePageItem;
