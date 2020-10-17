import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import {  } from 'features/geometry/wallSlice';
import Device from 'features/geometry/devices/Device';
import Grid from 'features/geometry/Grid';
import { updateActiveDevice } from './deviceSlice';

const DeviceDrawing = ({ isGrid, getRelCoord, mode }) => {
  const dispatch = useDispatch();
  const ids = useSelector(state => state.devices.ids);
  const { activeDevice, isMoving } = useSelector(state => {
    return {
      activeDevice: state.devices.activeDevice,
      isMoving: state.devices.isMoving
    };
  });

  const handleClick = e => {};

  const handleMouseMove = e => {
    if (isMoving && activeDevice) {
      dispatch(updateActiveDevice({ coords: getRelCoord(e) }));
    }
  };

  return (
    <g
      onClick={e => handleClick(e)}
      onMouseMove={e => handleMouseMove(e)}
      className='draw-area'
    >
      {ids.map(id => (
        <Device key={id} id={id} mode={mode} />
      ))}
    </g>
  );
};

export default DeviceDrawing;
