import React from 'react';

const DeviceIcon = ({ type, x, y }) => {
  return (
    <g>
      {type === 'PC' ? (
        <circle
          cx={x}
          cy={y - 35}
          r='20'
          stroke='red'
          fill='transparent'
          strokeWidth='5'
        />
      ) : (
        <circle
          cx={x}
          cy={y - 35}
          r='20'
          stroke='blue'
          fill='transparent'
          strokeWidth='5'
        />
      )}
    </g>
  );
};

export default DeviceIcon;
