import { collectionTT, noteTT, taskTT } from 'common/uiStates';
import { setActiveItemType } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const Controls = () => {
  const dispatch = useDispatch();
  return (
    <div className='task-controls'>
      <button onClick={() => dispatch(setActiveItemType(taskTT))}>Tasks</button>
      <button onClick={() => dispatch(setActiveItemType(noteTT))}>Notes</button>
      <button onClick={() => dispatch(setActiveItemType(collectionTT))}>
        Collections
      </button>
      <button onClick={() => dispatch()}>Floors</button>
      <button onClick={() => dispatch()}>Info</button>
    </div>
  );
};

export default Controls;
