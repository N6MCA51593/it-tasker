import React from 'react';
import { selectTaskerItemById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActiveItem } from 'features/tasker/taskerSlice';

const TaskerListItem = ({ id, completion }) => {
  const dispatch = useDispatch();
  const { name, createdAt } = useSelector(state =>
    selectTaskerItemById(state, id)
  );
  return (
    <div
      className='collection-table-item'
      onClick={() => dispatch(toggleActiveItem(id))}
    >
      <div>{name}</div>
      <div>{createdAt}</div>
      <div>{completion}</div>
    </div>
  );
};

export default TaskerListItem;
