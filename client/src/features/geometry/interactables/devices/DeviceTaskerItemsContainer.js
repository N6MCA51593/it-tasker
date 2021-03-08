import { NOTE_TT, TASK_TT } from 'app/constants';
import { selectDeviceActiveTaskerItemsSorted } from 'app/selectors';
import DeviceTaskerItems from 'features/geometry/interactables/devices/DeviceTaskerItems';
import React from 'react';
import { useSelector } from 'react-redux';

const DeviceTaskerItemsContainer = ({ id, floor }) => {
  const { tasks, notes } =
    useSelector(state => selectDeviceActiveTaskerItemsSorted(state, id)) ?? {};
  return (
    <div>
      <DeviceTaskerItems
        taskerItems={tasks}
        type={TASK_TT}
        id={id}
        floor={floor}
      />
      <DeviceTaskerItems
        taskerItems={notes}
        type={NOTE_TT}
        id={id}
        floor={floor}
      />
    </div>
  );
};

export default DeviceTaskerItemsContainer;
