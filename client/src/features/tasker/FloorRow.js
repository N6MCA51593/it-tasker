import React from 'react';
import { selectFloorById } from 'app/selectors';
import { useSelector } from 'react-redux';

const FloorRow = ({ id, isEditing, clickHandler, items }) => {
  const { name } = useSelector(state => selectFloorById(state, id));
  return (
    <div className='collection-row'>
      <span>{name}</span>
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
    </div>
  );
};

export default FloorRow;
