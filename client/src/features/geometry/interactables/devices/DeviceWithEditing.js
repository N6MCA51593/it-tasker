import React, { memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import DeviceIcon from 'features/geometry/interactables/devices/DeviceIcon';
import { selectDeviceById, selectActiveGlobalUiState } from 'app/selectors';
import {
  setActiveDevice,
  removeDevice,
  moveDevice
} from 'features/geometry/interactables/devices/deviceSlice';
import {
  ADD_DEVICE_GEO,
  EDIT_DEVICE_GEO,
  EDIT_INTERACTABLES_GLOB,
  MOVE_DEVICE_GEO,
  REMOVE_DEVICE_GEO
} from 'app/constants';
import clTern from 'common/clTern';

const DeviceWithEditing = ({ id, mode }) => {
  const dispatch = useDispatch();
  const device = useSelector(
    state => selectDeviceById(state, id),
    shallowEqual
  );
  const globalUiState = useSelector(selectActiveGlobalUiState);
  const isActive = useSelector(state => state.devices.activeDevice === id);
  const { type, x, y } = device;

  const handleClick = () => {
    if (mode === EDIT_DEVICE_GEO && globalUiState === EDIT_INTERACTABLES_GLOB) {
      dispatch(setActiveDevice(id));
    } else if (mode === REMOVE_DEVICE_GEO) {
      dispatch(removeDevice(id));
    } else if (mode === MOVE_DEVICE_GEO && !isActive) {
      dispatch(moveDevice(id));
    }
  };

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
        <DeviceIcon
          type={type}
          x={x}
          y={y}
          className={`device-icon${clTern(
            isActive && mode !== MOVE_DEVICE_GEO,
            ' highlighted'
          )}`}
        />
      </g>
    </g>
  );
};

export default memo(DeviceWithEditing);
