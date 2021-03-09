import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  getTaskerCompletionTable,
  selectAllActiveItemTypeTasksSorted,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { addItem } from 'features/tasker/taskerSlice';
import TaskerListItem from 'features/tasker/list-item/TaskerListItem';
import TaskerSinglePageItem from 'features/tasker/single-page-item/TaskerSinglePageItem';

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
      <button
        className='add-tasker-item-button'
        onClick={() => dispatch(addItem({ type: activeItemType }))}
      >
        +
      </button>
      {ids.map(id => (
        <TaskerListItem
          key={id}
          id={id}
          completion={completionTable[id]}
          wasActive={wasActive}
        />
      ))}
    </div>
  );
};

export default TaskerItemsContainer;
