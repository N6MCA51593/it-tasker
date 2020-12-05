import React from 'react';
import Controls from 'features/tasker/Controls';
import TaskerItemsContainer from 'features/tasker/TaskerItemsContainer';
import { shallowEqual, useSelector } from 'react-redux';
import { selectTaskerActiveItemProperties } from 'app/selectors';
import FloorItemsContainer from 'features/tasker/floors/FloorItemsContainer';
import { floorTT } from 'common/uiStates';
const TaskerContainer = () => {
  const { activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );

  const isFloorContainerActive = activeItemType === floorTT;

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
