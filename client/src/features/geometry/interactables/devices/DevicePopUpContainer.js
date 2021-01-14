import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeviceHoverStatus } from 'app/uiStateSlice';

const DevicePopUpContainer = ({ x, y, children }) => {
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    dispatch(setDeviceHoverStatus(true));
  };
  const handleMouseLeave = () => {
    dispatch(setDeviceHoverStatus(false));
  };
  return (
    <foreignObject
      x={x - 250}
      y={y - 280}
      width='500px'
      height='500px'
      className='popup-outer'
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div className='device-popup'>{children}</div>
    </foreignObject>
  );
};

export default DevicePopUpContainer;
