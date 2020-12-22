import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  getTaskerCompletionTable,
  selectAllActiveItemTypeTasksSorted,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { addItem } from 'features/tasker/taskerSlice';
import TaskerListItem from 'features/tasker/TaskerListItem';
import TaskerSinglePageItem from 'features/tasker/TaskerSinglePageItem';

const TaskerItemsContainer = () => {
  const dispatch = useDispatch();
  const [wasActive, setWasActive] = useState(null);
  const ids = useSelector(selectAllActiveItemTypeTasksSorted);
  const completionTable = useSelector(getTaskerCompletionTable, shallowEqual);
  const { activeItem, isEditing, activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );

  useEffect(() => {
    setWasActive(activeItem);
  }, [activeItem]);

  if (activeItem) {
    return <TaskerSinglePageItem id={activeItem} isEditing={isEditing} />;
  }

  return (
    <div className='tasker-items-container'>
      {ids.map(id => (
        <TaskerListItem
          key={id}
          id={id}
          completion={completionTable[id]}
          wasActive={wasActive}
        />
      ))}
      <button onClick={() => dispatch(addItem({ type: activeItemType }))}>
        Add
      </button>
    </div>
  );
};

export default TaskerItemsContainer;
