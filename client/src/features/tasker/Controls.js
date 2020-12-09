import { COLLECTION_TT, FLOOR_TT, NOTE_TT, TASK_TT } from 'app/constants';
import { setNoteFilter, setTaskFilter } from 'app/uiStateSlice';
import SortingOrderPicker from 'features/tasker/SortingOrderPicker';
import { setActiveItemType } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const Controls = ({ isFloorContainerActive, activeItemType }) => {
  const dispatch = useDispatch();

  return (
    <div className='task-controls-container'>
      <div className='task-controls'>
        <button onClick={() => dispatch(setActiveItemType(TASK_TT))}>
          Tasks
        </button>
        <button onClick={() => dispatch(setActiveItemType(NOTE_TT))}>
          Notes
        </button>
        <button onClick={() => dispatch(setActiveItemType(COLLECTION_TT))}>
          Collections
        </button>
        <button onClick={() => dispatch(setActiveItemType(FLOOR_TT))}>
          Floors
        </button>
      </div>
      {activeItemType === TASK_TT && (
        <div className='task-controls'>
          <button onClick={() => dispatch(setTaskFilter(null))}>All</button>
          <button onClick={() => dispatch(setTaskFilter(false))}>Active</button>
          <button onClick={() => dispatch(setTaskFilter(true))}>
            Completed
          </button>
          <SortingOrderPicker activeItemType={activeItemType} />
        </div>
      )}
      {activeItemType === NOTE_TT && (
        <div className='task-controls'>
          <button onClick={() => dispatch(setNoteFilter(null))}>All</button>
          <button onClick={() => dispatch(setNoteFilter(false))}>Active</button>
          <button onClick={() => dispatch(setNoteFilter(true))}>
            Archived
          </button>
          <SortingOrderPicker activeItemType={activeItemType} />
        </div>
      )}
      {activeItemType === COLLECTION_TT && (
        <div className='task-controls'>
          <SortingOrderPicker activeItemType={activeItemType} />
        </div>
      )}
    </div>
  );
};

export default Controls;
