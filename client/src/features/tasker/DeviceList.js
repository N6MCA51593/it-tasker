import React, { memo } from 'react';
import { selectTaskerItemById, selectDevicesById } from 'app/selectors';
import { useSelector } from 'react-redux';
import FloorRow from 'features/tasker/FloorRow';
import CollectionImport from 'features/tasker/CollectionImport';

const DeviceList = ({ id, isEditing }) => {
  const { devices, floors } = useSelector(state =>
    selectTaskerItemById(state, id)
  );
  const floorsDeduped = [...new Set(floors)];

  const deviceItems = useSelector(state => selectDevicesById(state, devices));

  return (
    <div>
      {isEditing && <CollectionImport />}
      {floorsDeduped.map(id => (
        <FloorRow
          key={id}
          id={id}
          items={deviceItems.filter(device => device.floor === id)}
        />
      ))}
    </div>
  );
};

export default memo(DeviceList);
