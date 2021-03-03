import { setActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useOverflow } from 'use-overflow';

const DevicePopUpContainer = ({ x, y, position, children }) => {
  const ref = useRef();
  const { refYOverflowing } = useOverflow(ref);
  const dispatch = useDispatch();
  return (
    <foreignObject
      x={x}
      y={y}
      className='popup-outer'
      style={position}
      onPointerDown={e => e.stopPropagation()}
      onWheel={e => refYOverflowing && e.stopPropagation()}
    >
      <div className='device-popup' ref={ref}>
        <div
          className='back nav-btn btn-device-popup'
          onClick={() => dispatch(setActiveDevice())}
        ></div>
        {children}
      </div>
    </foreignObject>
  );
};

export default DevicePopUpContainer;
