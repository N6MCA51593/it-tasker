import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  selectAllActiveItemTypeTasksSorted,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { addItem } from 'features/tasker/taskerSlice';
import TaskerListItem from 'features/tasker/TaskerListItem';
import TaskerSinglePageItem from 'features/tasker/TaskerSinglePageItem';

const TaskerItemsContainer = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectAllActiveItemTypeTasksSorted);
  const { activeItem, isEditing, activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );

  if (activeItem) {
    return <TaskerSinglePageItem id={activeItem} isEditing={isEditing} />;
  }

  return (
    <div className='tasker-items-container'>
      {ids.map(id => (
        <TaskerListItem key={id} id={id} />
      ))}
      <button onClick={() => dispatch(addItem({ type: activeItemType }))}>
        Add
      </button>
    </div>
  );
};

export default TaskerItemsContainer;
