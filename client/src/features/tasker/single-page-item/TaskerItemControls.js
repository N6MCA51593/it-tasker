import { COLLECTION_TT, TASK_TT } from 'app/constants';
import { selectTaskerItemById } from 'app/selectors';
import clTern from 'common/clTern';
import ConfirmationPopupComponent from 'common/ConfirmationPopupComponent';
import { checkOffTaskerItem } from 'features/api/checkOffTaskerItem';
import { removeTaskerItem } from 'features/api/removeTaskerItem';
import { toggleEditing } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TaskerItemControls = ({ id }) => {
  const dispatch = useDispatch();
  const { isCheckedOff, type } = useSelector(state =>
    selectTaskerItemById(state, id)
  );

  const checkOffButtonName =
    type === TASK_TT
      ? isCheckedOff
        ? 'Checked Off'
        : 'Check Off'
      : isCheckedOff
      ? 'Archived'
      : 'Archive';

  return (
    <div className='tasker-item-controls'>
      {type !== COLLECTION_TT && (
        <button
          onClick={() => dispatch(checkOffTaskerItem(id))}
          className={`btn primary ${clTern(
            isCheckedOff,
            'checked-off'
          )} ${type}`}
        >
          <span></span>
          {checkOffButtonName}
        </button>
      )}
      <button onClick={() => dispatch(toggleEditing())} className='btn s edit'>
        <span></span>
      </button>
      <ConfirmationPopupComponent
        opener={handleClick => (
          <button onClick={handleClick} className='btn s delete'>
            <span></span>
          </button>
        )}
        title={() => <h3>Are you sure you want to delete this item?</h3>}
        action={() => (
          <button
            className='but-del'
            onClick={() => dispatch(removeTaskerItem(id))}
          >
            Delete
          </button>
        )}
        cancel={handleClick => (
          <button className='but-cancel' onClick={handleClick}>
            Cancel
          </button>
        )}
        pos='r'
      />
    </div>
  );
};

export default TaskerItemControls;
