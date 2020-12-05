import { collectionTT, floorTT, noteTT, taskTT } from 'common/uiStates';
import {
  setActiveItemType,
  setNoteFilter,
  setTaskFilter
} from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const Controls = ({ isFloorContainerActive, activeItemType }) => {
  const dispatch = useDispatch();

  return (
    <div className='task-controls-container'>
      <div className='task-controls'>
        <button onClick={() => dispatch(setActiveItemType(taskTT))}>
          Tasks
        </button>
        <button onClick={() => dispatch(setActiveItemType(noteTT))}>
          Notes
        </button>
        <button onClick={() => dispatch(setActiveItemType(collectionTT))}>
          Collections
        </button>
        <button onClick={() => dispatch(setActiveItemType(floorTT))}>
          Floors
        </button>
      </div>
      {activeItemType === taskTT && (
        <div className='task-controls'>
          <button onClick={() => dispatch(setTaskFilter(null))}>All</button>
          <button onClick={() => dispatch(setTaskFilter(false))}>Active</button>
          <button onClick={() => dispatch(setTaskFilter(true))}>
            Completed
          </button>
        </div>
      )}
      {activeItemType === noteTT && (
        <div className='task-controls'>
          <button onClick={() => dispatch(setNoteFilter(null))}>All</button>
          <button onClick={() => dispatch(setNoteFilter(false))}>Active</button>
          <button onClick={() => dispatch(setNoteFilter(true))}>
            Archived
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;
