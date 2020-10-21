import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DevicePopUp from 'features/geometry/devices/DevicePopUp';
import DeviceOptions from 'features/geometry/devices/DeviceOptions';
import StatusIndicator from 'features/geometry/devices/StatusIndicator';
import DeviceIcon from 'features/geometry/devices/DeviceIcon';
import {
  setActiveDevice,
  removeDevice,
  moveDevice
} from 'features/geometry/devices/deviceSlice';

const Device = ({ id, mode }) => {
  const dispatch = useDispatch();
  const device = useSelector(state => state.devices.entities[id]);
  const isActive = useSelector(state => state.devices.activeDevice) === id;
  const {
    status,
    type,
    coords: { x },
    coords: { y }
  } = device;

  const handleClick = () => {
    if (mode === 'nav') {
      dispatch(setActiveDevice(id));
    } else if (mode === 'remove-device') {
      dispatch(removeDevice(id));
    } else if (mode === 'move-device' && !isActive) {
      dispatch(moveDevice(id));
    }
  };

  return (
    <g>
      <g
        onClick={() => handleClick()}
        className={
          mode === 'add-device' || (mode === 'move-device' && isActive)
            ? 'device-disabled'
            : ''
        }
      >
        <StatusIndicator status={status} x={x} y={y} />
        <DeviceIcon type={type} x={x} y={y} />
      </g>
      {isActive && mode !== 'move-device' && (
        <DevicePopUp x={x} y={y}>
          <DeviceOptions device={device} />
        </DevicePopUp>
      )}
    </g>
  );
};

export default Device;
