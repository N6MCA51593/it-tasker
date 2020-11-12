import React from 'react';

const Controls = ({ activeTab, setActiveTab }) => {
  return (
    <div className='task-controls'>
      <button onClick={() => setActiveTab('tasks')}>Tasks</button>
      <button onClick={() => setActiveTab('notes')}>Notes</button>
      <button onClick={() => setActiveTab('collections')}>Collections</button>
      <button onClick={() => setActiveTab('floors')}>Floors</button>
      <button onClick={() => setActiveTab('info')}>Info</button>
    </div>
  );
};

export default Controls;
