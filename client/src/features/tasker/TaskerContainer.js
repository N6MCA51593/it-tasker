import React from 'react';
import Controls from 'features/tasker/Controls';
import TaskerItemsContainer from 'features/tasker/TaskerItemsContainer';
const TaskerContainer = () => {
  return (
    <div className='task-container'>
      <Controls />
      <TaskerItemsContainer />
    </div>
  );
};

export default TaskerContainer;
