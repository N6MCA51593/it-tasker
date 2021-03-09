import { NOTE_TT, TASK_TT } from 'app/constants';
import { selectDeviceActiveTaskerItemsSorted } from 'app/selectors';
import DeviceTaskerItems from 'features/geometry/interactables/devices/DeviceTaskerItems';
import TaskerContainerControls from 'features/geometry/interactables/devices/TaskerContainerControls';
import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DeviceTaskerItemsContainer = ({ id, floor }) => {
  const [activeTaskerItemType, setActiveTaskerItemType] = useState(TASK_TT);
  const { tasks, notes } =
    useSelector(state => selectDeviceActiveTaskerItemsSorted(state, id)) ?? {};
  useLayoutEffect(() => {
    if (id) {
      setActiveTaskerItemType(TASK_TT); // Resets on id change
    }
  }, [id]);
  return (
    <div className='device-tasker-items-container'>
      <TaskerContainerControls
        setActiveTaskerItemType={setActiveTaskerItemType}
        activeTaskerItemType={activeTaskerItemType}
      />
      {activeTaskerItemType === TASK_TT && (
        <DeviceTaskerItems
          taskerItems={tasks}
          type={TASK_TT}
          id={id}
          floor={floor}
        />
      )}
      {activeTaskerItemType === NOTE_TT && (
        <DeviceTaskerItems
          taskerItems={notes}
          type={NOTE_TT}
          id={id}
          floor={floor}
        />
      )}
    </div>
  );
};

export default DeviceTaskerItemsContainer;
