import React from 'react';
import { selectActiveSoringOrder } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMPLETION_ASC,
  COMPLETION_DESC,
  CREATED_AT_ASC,
  CREATED_AT_DESC,
  LAST_EDITED_AT_ASC,
  LAST_EDITED_AT_DESC,
  TASK_TT
} from 'app/constants';
import { setTaskerSortingOrder } from 'app/uiStateSlice';

const SortingOrderPicker = ({ activeItemType }) => {
  const dispatch = useDispatch();
  const activeSortingOrder = useSelector(selectActiveSoringOrder);
  return (
    <select
      value={activeSortingOrder}
      onChange={e =>
        dispatch(
          setTaskerSortingOrder({ type: activeItemType, value: e.target.value })
        )
      }
    >
      <option value={CREATED_AT_ASC}>Created at (ascending)</option>
      <option value={CREATED_AT_DESC}>Created at (descending)</option>
      <option value={LAST_EDITED_AT_ASC}>Last edited at (ascending)</option>
      <option value={LAST_EDITED_AT_DESC}>Last edited at (descending)</option>
      {activeItemType === TASK_TT && (
        <option value={COMPLETION_ASC}>Completion (ascending)</option>
      )}
      {activeItemType === TASK_TT && (
        <option value={COMPLETION_DESC}>Completion (descending)</option>
      )}
    </select>
  );
};

export default SortingOrderPicker;
