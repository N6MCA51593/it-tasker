import React from 'react';
import { useSelector } from 'react-redux';

const DeviceGroups = ({ id, items }) => {
  const state = useSelector(state => state.state);
  return (
    <div className='collection-row-items'>
      {items.map(device => (
        <div
          className='collection-row-item'
          key={device.id}
          onClick={() => clickHandler(device.id, device.floor)}
        >
          {device.name}
        </div>
      ))}
    </div>
  );
};

export default DeviceGroups;
