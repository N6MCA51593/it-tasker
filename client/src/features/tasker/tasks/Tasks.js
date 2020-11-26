import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from 'features/tasker/taskerSlice';
import TaskerListItem from 'features/tasker/TaskerListItem';
import TaskSinglePage from 'features/tasker/tasks/TaskSinglePage';
import {
  selectTaskerActiveItemProperties,
  selectAllTasks
} from 'app/selectors';

const Tasks = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectAllTasks);
  const { activeItem, isEditing } = useSelector(
    selectTaskerActiveItemProperties
  );

  if (activeItem) {
    return <TaskSinglePage id={activeItem} isEditing={isEditing} />;
  }

  return (
    <Fragment>
      {ids.map(id => (
        <TaskerListItem key={id} id={id} />
      ))}
      <button onClick={() => dispatch(addItem({ type: 'task' }))}>Add</button>
    </Fragment>
  );
};

export default Tasks;
