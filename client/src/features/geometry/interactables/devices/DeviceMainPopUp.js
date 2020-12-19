import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import { selectDeviceActiveTaskerItems } from 'app/selectors';
import { NOTE_TT, TASK_TT } from 'app/constants';
import DeviceTaskerItems from 'features/geometry/interactables/devices/DeviceTaskerItems';

const DeviceMainPopUp = ({ id, floor }) => {
  const dispatch = useDispatch();
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
    <div className='options'>
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
      <button onClick={() => dispatch(setActiveDevice())}>Close</button>
    </div>
  );
};

export default DeviceMainPopUp;
