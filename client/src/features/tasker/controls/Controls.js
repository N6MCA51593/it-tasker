import { COLLECTION_TT, FLOOR_TT, NOTE_TT, TASK_TT } from 'app/constants';
import { setNoteFilter, setTaskFilter } from 'app/uiStateSlice';
import clTern from 'common/clTern';
import SortingOrderPicker from 'features/tasker/controls/SortingOrderPicker';
import TaskerContainerButton from 'features/tasker/controls/TaskerContainerButton';
import { setActiveItemType } from 'features/tasker/taskerSlice';
import React from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Controls = ({ activeItemType }) => {
  const dispatch = useDispatch();
  const isCheckedOffTaskFilter = useSelector(
    state => state.uiState.isCheckedOffTaskFilter
  );
  const isCheckedOffNoteFilter = useSelector(
    state => state.uiState.isCheckedOffNoteFilter
  );
  const activeTaskerItem = useSelector(state => state.tasker.activeItem);

  return (
    <div className='task-controls-container'>
      <div className='task-controls'>
        <TaskerContainerButton
          handleClick={() => dispatch(setActiveItemType(TASK_TT))}
          text='Tasks'
          type='tab'
          isActive={activeItemType === TASK_TT}
        />
        <TaskerContainerButton
          handleClick={() => dispatch(setActiveItemType(NOTE_TT))}
          text='Notes'
          type='tab'
          isActive={activeItemType === NOTE_TT}
        />
        <TaskerContainerButton
          handleClick={() => dispatch(setActiveItemType(COLLECTION_TT))}
          text='Collections'
          type='tab'
          isActive={activeItemType === COLLECTION_TT}
        />
        <TaskerContainerButton
          handleClick={() => dispatch(setActiveItemType(FLOOR_TT))}
          text='Floors'
          type='tab'
          isActive={activeItemType === FLOOR_TT}
        />
      </div>
      <div
        className={`task-controls filters ${clTern(
          activeItemType === COLLECTION_TT,
          'fe'
        )}`}
      >
        {activeItemType === TASK_TT && !activeTaskerItem && (
          <Fragment>
            <TaskerContainerButton
              handleClick={() => dispatch(setTaskFilter(null))}
              text='All'
              type='filter'
              isActive={isCheckedOffTaskFilter === null}
            />
            <TaskerContainerButton
              handleClick={() => dispatch(setTaskFilter(false))}
              text='Active'
              type='filter'
              isActive={
                isCheckedOffTaskFilter !== null && !isCheckedOffTaskFilter
              }
            />
            <TaskerContainerButton
              handleClick={() => dispatch(setTaskFilter(true))}
              text='Checked Off'
              type='filter'
              isActive={isCheckedOffTaskFilter}
            />
          </Fragment>
        )}
        {activeItemType === NOTE_TT && !activeTaskerItem && (
          <Fragment>
            <TaskerContainerButton
              handleClick={() => dispatch(setNoteFilter(null))}
              text='All'
              type='filter'
              isActive={isCheckedOffNoteFilter === null}
            />
            <TaskerContainerButton
              handleClick={() => dispatch(setNoteFilter(false))}
              text='Active'
              type='filter'
              isActive={
                isCheckedOffNoteFilter !== null && !isCheckedOffNoteFilter
              }
            />
            <TaskerContainerButton
              handleClick={() => dispatch(setNoteFilter(true))}
              text='Archived'
              type='filter'
              isActive={isCheckedOffNoteFilter}
            />
          </Fragment>
        )}
        {activeItemType !== FLOOR_TT && (
          <SortingOrderPicker
            activeItemType={activeItemType}
            activeTaskerItem={activeTaskerItem}
            interactableType='device'
          />
        )}
        {activeTaskerItem && (
          <SortingOrderPicker
            activeItemType={activeItemType}
            activeTaskerItem={activeTaskerItem}
            interactableType='area'
          />
        )}
      </div>
    </div>
  );
};

export default Controls;
