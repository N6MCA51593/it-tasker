import React, { useRef } from 'react';
import { useOverflow } from 'use-overflow';

const DevicePopUpContainer = ({ x, y, position, children }) => {
  const ref = useRef();
  const { refYOverflowing } = useOverflow(ref);
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
        {children}
      </div>
    </foreignObject>
  );
};

export default DevicePopUpContainer;
