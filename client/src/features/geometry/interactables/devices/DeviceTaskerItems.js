import DeviceTaskerItem from 'features/geometry/interactables/devices/DeviceTaskerItem';
import { addItem, toggleActiveItem } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const DeviceTaskerItems = ({ taskerItems, type, id, floor }) => {
  const dispatch = useDispatch();

  return (
    <div className='device-tasker-items'>
      {type}
      {taskerItems &&
        taskerItems.map(id => (
          <DeviceTaskerItem
            key={id}
            id={id}
            clickHandler={() => dispatch(toggleActiveItem(id))}
          />
        ))}
      <button
        onClick={() =>
          dispatch(addItem({ deviceId: id, type, deviceFloor: floor }))
        }
      >
        Add
      </button>
    </div>
  );
};

export default DeviceTaskerItems;
