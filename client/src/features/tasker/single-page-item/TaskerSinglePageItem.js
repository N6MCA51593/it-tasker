import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleActiveItem, toggleEditing } from 'features/tasker/taskerSlice';
import DeviceList from 'features/tasker/single-page-item/DeviceList';
import TaskerItemTextEditables from 'features/tasker/single-page-item/TaskerItemTextEditables';
import ConfirmationPopUp from 'common/ConfirmationPopUp';
import useConfirmationPopUp from 'common/useConfirmationPopUp';
import { removeTaskerItem } from 'features/api/removeTaskerItem';
import { checkOffTaskerItem } from 'features/api/checkOffTaskerItem';
import BackButton from 'features/tasker/single-page-item/BackButton';
import TaskerItemText from 'features/tasker/single-page-item/TaskerItemText';
import TaskerItemControls from 'features/tasker/single-page-item/TaskerItemControls';

const TaskerSinglePageItem = ({ id, isEditing }) => {
  const dispatch = useDispatch();
  const { isShowing, togglePopUp } = useConfirmationPopUp();

  return (
    <div className='tasker-single-page-item'>
      <BackButton isEditing={isEditing} />
      {isEditing ? (
        <TaskerItemTextEditables id={id} />
      ) : (
        <TaskerItemText id={id} />
      )}
      {!isEditing && <TaskerItemControls id={id} />}
      <DeviceList id={id} isEditing={isEditing} />
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
        <button onClick={() => dispatch(checkOffTaskerItem(id))}>Toggle</button>
      )}
    </div>
  );
};

export default TaskerSinglePageItem;
