import React from 'react';
import { selectTaskerItemById, selectDevicesById } from 'app/selectors';
import { useSelector } from 'react-redux';
import FloorRow from 'features/tasker/FloorRow';

const DeviceList = ({ id, isEditing, clickHandler }) => {
  const { devices, floors } = useSelector(state =>
    selectTaskerItemById(state, id)
  );
  const floorsDeduped = new Set([floors]);

  const deviceItems = useSelector(state => selectDevicesById(state, devices));

  return (
    <div>
      {[...floorsDeduped].map(id => (
        <FloorRow
          key={id}
          id={id}
          isEditing={isEditing}
          clickHandler={clickHandler}
          items={devices.map(deivceId =>
            deviceItems.filter(device => device.id === deviceId)
          )}
        />
      ))}
    </div>
  );
};

export default DeviceList;
