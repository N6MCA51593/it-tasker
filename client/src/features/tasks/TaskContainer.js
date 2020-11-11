import React, { useState } from 'react';
import Controls from 'features/tasks/Controls';

const TaskContainer = () => {
  const [tab, setTab] = useState('tasks');
  return (
    <div className='task-container'>
      <Controls mode={tab} setTab={setTab} />
    </div>
  );
};

export default TaskContainer;
