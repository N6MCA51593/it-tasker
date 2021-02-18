import React from 'react';
import { selectActiveSortingOrder } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMPLETION_ASC,
  COMPLETION_DESC,
  CREATED_AT_ASC,
  CREATED_AT_DESC,
  DEVICE_COUNT_ASC,
  DEVICE_COUNT_DESC,
  LAST_EDITED_AT_ASC,
  LAST_EDITED_AT_DESC,
  TASK_TT
} from 'app/constants';
import { setTaskerSortingOrder } from 'app/uiStateSlice';

const SortingOrderPicker = ({
  activeItemType,
  interactableType,
  activeTaskerItem
}) => {
  const dispatch = useDispatch();
  let activeSortingOrder = useSelector(selectActiveSortingOrder);
  activeSortingOrder = activeTaskerItem
    ? activeSortingOrder[interactableType]
    : activeSortingOrder;
  return (
    <select
      value={activeSortingOrder}
      onChange={e =>
        dispatch(
          setTaskerSortingOrder({
            type: activeItemType,
            value: e.target.value,
            interactableType: activeTaskerItem && interactableType
          })
        )
      }
    >
      <option value={CREATED_AT_ASC}>
        {activeTaskerItem
          ? `${capitalize(interactableType)} added at (newer first)`
          : 'Created at (newer first)'}
      </option>
      <option value={CREATED_AT_DESC}>
        {activeTaskerItem
          ? `${capitalize(interactableType)} added at (older first)`
          : 'Created at (older first)'}
      </option>
      {!activeTaskerItem && (
        <option value={LAST_EDITED_AT_ASC}>Last edited at (newer first)</option>
      )}
      {!activeTaskerItem && (
        <option value={LAST_EDITED_AT_DESC}>
          Last edited at (older first)
        </option>
      )}
      {activeTaskerItem && interactableType === 'area' && (
        <option value={DEVICE_COUNT_ASC}>
          {`Areas by device count (ascending)`}
        </option>
      )}
      {activeTaskerItem && interactableType === 'area' && (
        <option value={DEVICE_COUNT_DESC}>
          {`Areas by device count (descending)`}
        </option>
      )}
      {activeItemType === TASK_TT && (
        <option value={COMPLETION_ASC}>
          {activeTaskerItem
            ? `${capitalize(interactableType)}s by completion (ascending)`
            : 'Completion (ascending)'}
        </option>
      )}
      {activeItemType === TASK_TT && (
        <option value={COMPLETION_DESC}>
          {activeTaskerItem
            ? `${capitalize(interactableType)}s by completion (descending)`
            : 'Completion (descending)'}
        </option>
      )}
    </select>
  );
};

export default SortingOrderPicker;

const capitalize = s => {
  return s?.charAt(0)?.toUpperCase() + s?.slice(1);
};
