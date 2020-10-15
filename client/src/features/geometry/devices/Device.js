import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DevicePopUp from 'features/geometry/devices/DevicePopUp';
//import {  } from 'features/geometry/deviceSlice';

const Device = ({ id, mode }) => {
  const device = useSelector(state => state.devices.entities[id]);
  const isActive = useSelector(state => state.devices.activeDevice) === id;
  const { x, y } = device.coords;
  return (
    <g>
      <circle cx={x} cy={y} r='5px' fill='#711c' />
      {isActive && <DevicePopUp x={x} y={y} />}
    </g>
  );
};

export default Device;
