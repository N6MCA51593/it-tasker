import { setActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

const DevicePopUpContainer = ({ x, y, position, children }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const handleScroll = e => {
    if (ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      // Prevent zooming on significant overflowing
      if ((scrollHeight - clientHeight) / clientHeight > 0.1) {
        e.stopPropagation();
      }
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
