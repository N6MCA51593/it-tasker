import React, { useState } from 'react';
import Controls from 'features/tasker/Controls';
import TaskerItemsContainer from 'features/tasker/TaskerItemsContainer';

const TaskerContainer = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  return (
    <div className='task-container'>
      <Controls activeTab={activeTab} setActiveTab={setActiveTab} />
      <TaskerItemsContainer activeTab={activeTab} />
    </div>
  );
};

export default TaskerContainer;
