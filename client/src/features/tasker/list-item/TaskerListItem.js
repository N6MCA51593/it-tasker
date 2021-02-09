import React, { useEffect, useRef } from 'react';
import TimeAgo from 'timeago-react';
import { selectTaskerItemById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActiveItem } from 'features/tasker/taskerSlice';
import TaskerItemBadge from 'features/tasker/list-item/TaskerItemBadge';
import { TASK_TT } from 'app/constants';

const TaskerListItem = ({ id, completion, wasActive }) => {
  const dispatch = useDispatch();
  const {
    name,
    createdAt,
    lastEditedAt,
    type,
    isCheckedOff
  } = useSelector(state => selectTaskerItemById(state, id));
  const ref = useRef();

  useEffect(() => {
    if (wasActive === id) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [wasActive, id]);

  let completionMod = 'comp-';
  if (completion === 0) {
    completionMod += 'low';
  } else if (completion === 1 && !isCheckedOff) {
    completionMod += 'high';
  } else if (isCheckedOff) {
    completionMod += 'completed';
  } else {
    completionMod += 'mid';
  }

  return (
    <div
      className='collection-table-item'
      onClick={() => dispatch(toggleActiveItem(id))}
      ref={ref}
    >
      <div>
        <TimeAgo className='tasker-item-ts ca' datetime={createdAt} />
        <TimeAgo className='tasker-item-ts lea' datetime={lastEditedAt} />
      </div>
      <div>
        <TaskerItemBadge type={type} />
        {type === TASK_TT && <TaskerItemBadge type={completionMod} />}
      </div>
      <h3>{name}</h3>
      <div>{createdAt}</div>
      <div>{completion}</div>
    </div>
  );
};

export default TaskerListItem;
