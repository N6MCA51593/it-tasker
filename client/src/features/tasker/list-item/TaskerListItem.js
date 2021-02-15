import React, { useEffect, useRef } from 'react';
import { selectTaskerItemById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActiveItem } from 'features/tasker/taskerSlice';
import TaskerItemBadge from 'features/tasker/list-item/TaskerItemBadge';
import { NOTE_TT, TASK_TT } from 'app/constants';
import ProgressBar from 'features/tasker/list-item/ProgressBar';
import Timestamp from 'features/tasker/list-item/Timestamp';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

const TaskerListItem = ({ id, completion, wasActive }) => {
  const dispatch = useDispatch();
  const {
    name,
    createdAt,
    lastEditedAt,
    type,
    isCheckedOff,
    description
  } = useSelector(state => selectTaskerItemById(state, id));
  const ref = useRef();

  useEffect(() => {
    if (wasActive === id) {
      scrollIntoView(ref.current, {
        scrollMode: 'if-needed',
        behavior: 'smooth',
        block: 'center'
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
        <Timestamp ts={createdAt} mod='ca' />
        <Timestamp ts={lastEditedAt} mod='lea' />
      </div>
      <div>
        <TaskerItemBadge type={type} />
        {type === TASK_TT && <TaskerItemBadge type={completionMod} />}
        {type === NOTE_TT && (
          <TaskerItemBadge
            type={isCheckedOff ? 'comp-note-archived' : 'comp-note-active'}
          />
        )}
      </div>
      <h3>{name}</h3>
      <div className='tasker-item-description'>
        {description ? description : 'No description available'}
      </div>
      {type === TASK_TT && (
        <ProgressBar progress={(completion * 100).toFixed(1)} />
      )}
    </div>
  );
};

export default TaskerListItem;
