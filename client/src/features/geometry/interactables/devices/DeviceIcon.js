import React from 'react';

const DeviceIcon = ({ type, x, y, className }) => {
  return (
    <g>
      {type === 'PC' ? (
        <use href='#icon' x={x} y={y} className={className} />
      ) : (
        <circle
          cx={x}
          cy={y - 35}
          r='20'
          stroke='blue'
          fill='transparent'
          strokeWidth='5'
          className={className}
        />
      )}
    </g>
  );
};

export default DeviceIcon;
