import React, { memo, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import DeviceIcon from 'features/geometry/interactables/devices/DeviceIcon';
import {
  selectDeviceById,
  selectActiveGlobalUiState,
  selectDeviceActiveItemStatus,
  selectTaskerActiveItemProperties,
  selectHasActiveTaskerItemsOfType
} from 'app/selectors';
import { toggleDevice } from 'features/tasker/taskerSlice';
import { checkOffDevices } from 'features/api/checkOffDevices';
import {
  ADD_DEVICE_GEO,
  EDIT_TASKER_ITEMS_GLOB,
  MAIN_GLOB,
  MOVE_DEVICE_GEO,
  NOTE_TT,
  TASK_TT
} from 'app/constants';
import { setActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import clTern from 'common/clTern';

const Device = ({ id, mode }) => {
  const dispatch = useDispatch();
  const device = useSelector(
    state => selectDeviceById(state, id),
    shallowEqual
  );
  const { status, type, floor, x, y } = device;
  const activeTaskerItemStatus = useSelector(state =>
    selectDeviceActiveItemStatus(state, id)
  );
  const { activeItemType, activeItem } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );
  const globalUiState = useSelector(selectActiveGlobalUiState);
  const isActive = useSelector(state => state.devices.activeDevice === id);
  const isVisible = useSelector(
    state => state.uiState.activeDeviceFilters[type]
  );
  const hasActiveTaskerItemsOfTypeSelector = useMemo(
    selectHasActiveTaskerItemsOfType,
    []
  );
  const hasActiveNotes = useSelector(state =>
    hasActiveTaskerItemsOfTypeSelector(state, { id, type: NOTE_TT })
  );
  const hasActiveTasks = useSelector(state =>
    hasActiveTaskerItemsOfTypeSelector(state, { id, type: TASK_TT })
  );

  const handleClick = () => {
    if (globalUiState === EDIT_TASKER_ITEMS_GLOB) {
      dispatch(toggleDevice({ id, floor }));
    } else if (
      activeItemType === TASK_TT &&
      typeof activeTaskerItemStatus !== 'undefined'
    ) {
      dispatch(checkOffDevices({ toCheckOff: id }));
    } else if (globalUiState === MAIN_GLOB) {
      dispatch(setActiveDevice(id));
    }
  };

  const isHighlighted = isActive && mode !== MOVE_DEVICE_GEO;
  const isTransparent =
    activeItem && typeof activeTaskerItemStatus === 'undefined';
  const isGrayscale =
    activeItem &&
    activeItemType === TASK_TT &&
    typeof activeTaskerItemStatus !== 'undefined' &&
    !activeTaskerItemStatus;

  const iconClassName = `device-icon ${clTern(isTransparent, 'trnsp')} ${clTern(
    isGrayscale || isTransparent,
    'gs'
  )} ${clTern(isHighlighted, 'highlighted')}`;

  if (!isVisible && typeof activeTaskerItemStatus === 'undefined') {
    return null;
  }

  return (
    <g
      onClick={() => handleClick()}
      className={
        mode === ADD_DEVICE_GEO || (mode === MOVE_DEVICE_GEO && isActive)
          ? 'device-disabled'
          : ''
      }
    >
      <DeviceIcon
        type={type}
        x={x}
        y={y}
        className={iconClassName}
        status={status}
        hasActiveNotes={hasActiveNotes}
        hasActiveTasks={hasActiveTasks}
      />
    </g>
  );
};

export default memo(Device);
