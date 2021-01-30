import { COLLECTION_TT, FLOOR_TT, NOTE_TT, TASK_TT } from 'app/constants';
import { setNoteFilter, setTaskFilter } from 'app/uiStateSlice';
import SortingOrderPicker from 'features/tasker/controls/SortingOrderPicker';
import TaskerFilterButton from 'features/tasker/controls/TaskerFilterButton';
import { setActiveItemType } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const Controls = ({ isFloorContainerActive, activeItemType }) => {
  const dispatch = useDispatch();

  return (
    <div className='task-controls-container'>
      <div className='task-controls'>
        <TaskerFilterButton
          handleClick={() => dispatch(setActiveItemType(TASK_TT))}
          text='Tasks'
          isActive={activeItemType === TASK_TT}
        />
        <TaskerFilterButton
          handleClick={() => dispatch(setActiveItemType(NOTE_TT))}
          text='Notes'
          isActive={activeItemType === NOTE_TT}
        />
        <TaskerFilterButton
          handleClick={() => dispatch(setActiveItemType(COLLECTION_TT))}
          text='Collections'
          isActive={activeItemType === COLLECTION_TT}
        />
        <TaskerFilterButton
          handleClick={() => dispatch(setActiveItemType(FLOOR_TT))}
          text='Floors'
          isActive={activeItemType === FLOOR_TT}
        />
      </div>
      {activeItemType === TASK_TT && (
        <div className='task-controls tk2'>
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
