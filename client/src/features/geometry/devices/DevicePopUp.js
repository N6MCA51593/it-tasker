import React from 'react';

const DevicePopUp = ({ x, y, children }) => {
  return (
    <foreignObject
      x={x - 250}
      y={y - 280}
      width='500px'
      height='500px'
      className='popup-outer'
    >
      <div className='device-popup'>{children}</div>
    </foreignObject>
  );
};

export default DevicePopUp;
