import { checkOffDevices } from 'features/api/checkOffDevices';
import DeviceTaskerItem from 'features/geometry/interactables/devices/DeviceTaskerItem';
import { addItem, toggleActiveItem } from 'features/tasker/taskerSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const DeviceTaskerItems = ({ taskerItems, type, id, floor }) => {
  const dispatch = useDispatch();

  return (
    <div className='device-tasker-items'>
      <button
        className='add-tasker-item-button s'
        onClick={() =>
          dispatch(addItem({ deviceId: id, type, deviceFloor: floor }))
        }
      >
        +
      </button>
      {taskerItems &&
        taskerItems.map(taskerItemId => (
          <DeviceTaskerItem
            key={taskerItemId}
            id={taskerItemId}
            toggleActive={() => dispatch(toggleActiveItem(taskerItemId))}
            checkOff={() =>
              dispatch(checkOffDevices({ toCheckOff: id, taskerItemId }))
            }
          />
        ))}
    </div>
  );
};

export default DeviceTaskerItems;
