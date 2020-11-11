import React from 'react';

const Controls = ({ tab, setTab }) => {
  return (
    <div className='task-controls'>
      <button onClick={() => setTab('tasks')}>Tasks</button>
      <button onClick={() => setTab('notes')}>Notes</button>
      <button onClick={() => setTab('collections')}>Collections</button>
      <button onClick={() => setTab('floors')}>Floors</button>
      <button onClick={() => setTab('info')}>Info</button>
    </div>
  );
};

export default Controls;
