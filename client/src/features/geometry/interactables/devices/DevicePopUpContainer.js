import { setActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

const DevicePopUpContainer = ({ x, y, position, children }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const handleScroll = e => {
    if (ref.current && ref.current.scrollHeight !== ref.current.clientHeight) {
      e.stopPropagation();
    }
  };

  return (
    <foreignObject
      x={x}
      y={y}
      className='popup-outer'
      style={position}
      onPointerDown={e => e.stopPropagation()}
    >
      <div className='device-popup' onWheel={e => handleScroll(e)} ref={ref}>
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
