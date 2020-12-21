import React, { useEffect, useRef } from 'react';
import { selectTaskerItemById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActiveItem } from 'features/tasker/taskerSlice';

const TaskerListItem = ({ id, completion, wasActive }) => {
  const dispatch = useDispatch();
  const { name, createdAt } = useSelector(state =>
    selectTaskerItemById(state, id)
  );
  const ref = useRef();
  useEffect(() => {
    if (wasActive === id) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [wasActive, id]);
  return (
    <div
      className='collection-table-item'
      onClick={() => dispatch(toggleActiveItem(id))}
      ref={ref}
    >
      <div>{name}</div>
      <div>{createdAt}</div>
      <div>{completion}</div>
    </div>
  );
};

export default TaskerListItem;
