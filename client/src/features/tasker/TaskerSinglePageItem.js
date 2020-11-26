import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleActiveItem, toggleEditing } from 'features/tasker/taskerSlice';
import DeviceList from 'features/tasker/DeviceList';
import TaskerItemTextEditables from 'features/tasker/TaskerItemTextEditables';

const TaskerSinglePageItem = ({ id, isEditing }) => {
  const dispatch = useDispatch();

  return (
    <div className='collection-single-page'>
      <TaskerItemTextEditables id={id} />
      <DeviceList id={id} />
      {!isEditing && (
        <button onClick={() => dispatch(toggleEditing())}>Edit</button>
      )}
      {!isEditing && (
        <button onClick={() => dispatch(toggleActiveItem())}>Back</button>
      )}
    </div>
  );
};

export default TaskerSinglePageItem;
