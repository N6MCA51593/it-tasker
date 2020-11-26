import React from 'react';
import Controls from 'features/tasker/Controls';
//import TaskerItemsContainer from 'features/tasker/TaskerItemsContainer';
import TaskerItemsContainer2 from 'features/tasker/TaskerItemsContainer2';
const TaskerContainer = () => {
  return (
    <div className='task-container'>
      <Controls />
      <TaskerItemsContainer2 />
    </div>
  );
};

export default TaskerContainer;
