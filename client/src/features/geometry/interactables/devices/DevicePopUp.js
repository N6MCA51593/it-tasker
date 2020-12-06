import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeviceHoverStatus } from 'app/uiStateSlice';
import { navGeo } from 'common/uiStates';

const DevicePopUp = ({ x, y, mode, children }) => {
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    if (mode === navGeo) {
      dispatch(setDeviceHoverStatus(true));
    }
  };
  const handleMouseLeave = () => {
    if (mode === navGeo) {
      dispatch(setDeviceHoverStatus(false));
    }
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

export default DevicePopUp;
