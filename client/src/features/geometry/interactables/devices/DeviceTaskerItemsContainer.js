import { NOTE_TT, TASK_TT } from 'app/constants';
import { selectDeviceActiveTaskerItems } from 'app/selectors';
import DeviceTaskerItems from 'features/geometry/interactables/devices/DeviceTaskerItems';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const DeviceTaskerItemsContainer = ({ id, floor }) => {
  const activeTaskerItemsSelector = useMemo(selectDeviceActiveTaskerItems, []);
  const activeTaskerItems = useSelector(state =>
    activeTaskerItemsSelector(state, id)
  );
  const tasks =
    activeTaskerItems &&
    activeTaskerItems.filter(item => item.type === TASK_TT);
  const notes =
    activeTaskerItems &&
    activeTaskerItems.filter(item => item.type === NOTE_TT);
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
