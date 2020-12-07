import React, { memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import DevicePopUp from 'features/geometry/interactables/devices/DevicePopUp';
import DeviceOptions from 'features/geometry/interactables/devices/DeviceOptions';
import StatusIndicator from 'features/geometry/interactables/devices/StatusIndicator';
import DeviceIcon from 'features/geometry/interactables/devices/DeviceIcon';
import {
  selectDeviceById,
  selectActiveGlobalUiState,
  selectDeviceActiveItemStatus,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import {
  setActiveDevice,
  removeDevice,
  moveDevice
} from 'features/geometry/interactables/devices/deviceSlice';
import { toggleDevice } from 'features/tasker/taskerSlice';
import { checkOffDevices } from 'features/api/checkOffDevices';
import {
  ADD_DEVICE_GEO,
  EDIT_INTERACTABLES_GLOB,
  EDIT_TASKER_ITEMS_GLOB,
  MOVE_DEVICE_GEO,
  NAV_GEO,
  REMOVE_DEVICE_GEO,
  TASK_TT
} from 'app/constants';

const Device = ({ id, mode }) => {
  const dispatch = useDispatch();
  const device = useSelector(
    state => selectDeviceById(state, id),
    shallowEqual
  );
  const activeTaskerItemStatus = useSelector(state =>
    selectDeviceActiveItemStatus(state, id)
  );
  const { activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );
  const globalUiState = useSelector(selectActiveGlobalUiState);
  const isActive = useSelector(state => state.devices.activeDevice === id);
  const { status, type, floor, x, y } = device;

  const handleClick = () => {
    if (mode === NAV_GEO && globalUiState === EDIT_INTERACTABLES_GLOB) {
      dispatch(setActiveDevice(id));
    } else if (mode === REMOVE_DEVICE_GEO) {
      dispatch(removeDevice(id));
    } else if (mode === MOVE_DEVICE_GEO && !isActive) {
      dispatch(moveDevice(id));
    } else if (globalUiState === EDIT_TASKER_ITEMS_GLOB) {
      dispatch(toggleDevice({ id, floor }));
    } else if (
      activeItemType === TASK_TT &&
      typeof activeTaskerItemStatus !== 'undefined'
    ) {
      dispatch(checkOffDevices(id));
    }
  };
  const iconClassName =
    typeof activeTaskerItemStatus !== 'undefined'
      ? 'device-icon-selected'
      : 'device-icon';

  return (
    <g>
      <g
        onClick={() => handleClick()}
        className={
          mode === ADD_DEVICE_GEO || (mode === MOVE_DEVICE_GEO && isActive)
            ? 'device-disabled'
            : ''
        }
      >
        <StatusIndicator status={status} x={x} y={y} />
        <DeviceIcon type={type} x={x} y={y} className={iconClassName} />
      </g>
      {isActive && mode !== MOVE_DEVICE_GEO && (
        <DevicePopUp x={x} y={y} mode={mode}>
          <DeviceOptions device={device} />
        </DevicePopUp>
      )}
    </g>
  );
};

export default memo(Device);
