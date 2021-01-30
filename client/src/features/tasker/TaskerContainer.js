import React from 'react';
import Controls from 'features/tasker/controls/Controls';
import TaskerItemsContainer from 'features/tasker/TaskerItemsContainer';
import { shallowEqual, useSelector } from 'react-redux';
import { selectTaskerActiveItemProperties } from 'app/selectors';
import FloorItemsContainer from 'features/tasker/floors/FloorItemsContainer';
import { FLOOR_TT } from 'app/constants';
const TaskerContainer = () => {
  const { activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );

  const isFloorContainerActive = activeItemType === FLOOR_TT;

  return (
    <div className='task-container'>
      <Controls
        isFloorContainerActive={isFloorContainerActive}
        activeItemType={activeItemType}
      />
      {!isFloorContainerActive && <TaskerItemsContainer />}
      {isFloorContainerActive && <FloorItemsContainer />}
    </div>
  );
};

export default TaskerContainer;
