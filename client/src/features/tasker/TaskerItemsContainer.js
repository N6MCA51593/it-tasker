import React from 'react';
import Collections from 'features/tasker/collections/Collections';
import Tasks from 'features/tasker/tasks/Tasks';

const TaskerItemsContainer = ({ activeTab }) => {
  return (
    <div className='tasker-items-container'>
      {activeTab === 'collections' && <Collections />}
      {activeTab === 'tasks' && <Tasks />}
    </div>
  );
};

export default TaskerItemsContainer;
