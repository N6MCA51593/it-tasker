import React from 'react';
import Collections from 'features/tasker/collections/Collections';

const TaskerItemsContainer = ({ activeTab }) => {
  return (
    <div className='tasker-items-container'>
      {activeTab === 'collections' && <Collections />}
    </div>
  );
};

export default TaskerItemsContainer;
