import React from 'react';
import { selectFloorById } from 'app/selectors';
import { useSelector } from 'react-redux';
import DeviceGroups from 'features/tasker/DeviceGroups';

const FloorRow = ({ id, items }) => {
  const { name } = useSelector(state => selectFloorById(state, id));
  return (
    <div className='collection-row'>
      <span>{name}</span>
      <DeviceGroups items={items} id={id} />
    </div>
  );
};

export default FloorRow;
