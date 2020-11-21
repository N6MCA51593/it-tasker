import React from 'react';
import { selectTaskerItemById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActiveItem } from 'features/tasker/taskerSlice';

const TaskerListItem = ({ id }) => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => selectTaskerItemById(state, id));
  return (
    <div
      className='collection-table-item'
      onClick={() => dispatch(toggleActiveItem(id))}
    >
      {name}
    </div>
  );
};

export default TaskerListItem;
