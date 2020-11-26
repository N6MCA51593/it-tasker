import {
  selectChildDevices,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { toggleDevice } from 'features/tasker/taskerSlice';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const useAreaTaskerState = (id, floor) => {
  const dispatch = useDispatch();
  const childDevices = useSelector(
    state => selectChildDevices(state, id),
    shallowEqual
  );
  const { activeItem, isEditing } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );

  const toggleChildren = useCallback(() => {
    if (activeItem && isEditing) {
      const payload = childDevices.map(deviceId => {
        return { id: deviceId, floor };
      });
      dispatch(toggleDevice(payload));
    }
  }, [dispatch, childDevices, floor, activeItem, isEditing]);

  return {
    toggleChildren
  };
};

export default useAreaTaskerState;
