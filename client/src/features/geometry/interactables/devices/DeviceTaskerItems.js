import DeviceTaskerItem from 'features/geometry/interactables/devices/DeviceTaskerItem';
import { addItem } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const DeviceTaskerItems = ({ taskerItems, type, id }) => {
  const dispatch = useDispatch();

  return (
    <div className='device-tasker-items'>
      {type}
      {taskerItems.map(item => (
        <DeviceTaskerItem key={item.id} taskerItem={item} />
      ))}
      <button onClick={() => dispatch(addItem(id, type))}>Add</button>
    </div>
  );
};

export default DeviceTaskerItems;
