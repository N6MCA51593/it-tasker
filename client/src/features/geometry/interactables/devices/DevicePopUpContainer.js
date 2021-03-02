import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeviceHoverStatus } from 'app/uiStateSlice';

const DevicePopUpContainer = ({ x, y, position, children }) => {
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    dispatch(setDeviceHoverStatus(true));
  };
  const handleMouseLeave = () => {
    dispatch(setDeviceHoverStatus(false));
  };

  return (
    <foreignObject
      x={x}
      y={y}
      className='popup-outer'
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      style={position}
      onWheel={e => e.stopPropagation()}
    >
      <div className='device-popup'>{children}</div>
    </foreignObject>
  );
};

export default DevicePopUpContainer;
