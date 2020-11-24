import { selectTaskerActiveAndEditing } from 'app/selectors';
import { toggleDevice } from 'features/tasker/taskerSlice';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const useAreaTaskerState = (id, floor) => {
  const dispatch = useDispatch();
  const { activeItem, isEditing } = useSelector(
    selectTaskerActiveAndEditing,
    shallowEqual
  );
  const deviceChildren = useSelector(
    state =>
      state.devices.ids.filter(
        deviceId => state.devices.entities[deviceId].area === id
      ),
    shallowEqual
  );

  const toggleChildren = useCallback(() => {
    if (activeItem && isEditing) {
      const payload = deviceChildren.map(deviceId => {
        return { id: deviceId, floor };
      });
      dispatch(toggleDevice(payload));
    }
  }, [dispatch, deviceChildren, floor, activeItem, isEditing]);

  return {
    toggleChildren
  };
};

export default useAreaTaskerState;
