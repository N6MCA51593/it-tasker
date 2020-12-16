import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import { selectDeviceActiveTasks } from 'app/selectors';

const DeviceTaskerItems = ({ device }) => {
  const dispatch = useDispatch();
  const { id, name, type, description, status } = device;
  const activeTasksSelector = useMemo(selectDeviceActiveTasks, []);
  const activeTasks = useSelector(state => activeTasksSelector(state, id));
  console.log(activeTasks);

  return (
    <div className='options'>
      <button onClick={() => dispatch(setActiveDevice())}>Close</button>
    </div>
  );
};

export default DeviceTaskerItems;
