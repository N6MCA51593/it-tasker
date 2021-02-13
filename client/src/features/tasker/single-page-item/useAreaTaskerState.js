import {
  selectChildDevices,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { toggleDevice, removeDevices } from 'features/tasker/taskerSlice';
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

  const removeChildren = useCallback(
    devices => {
      if (activeItem && isEditing) {
        const payload = devices.map(device => {
          return { device: device.id, floor: device.floor };
        });
        dispatch(removeDevices(payload));
      }
    },
    [dispatch, activeItem, isEditing]
  );

  const toggleChildren = useCallback(() => {
    if (activeItem && isEditing && childDevices) {
      const payload = childDevices.map(deviceId => {
        return { id: deviceId, floor };
      });
      dispatch(toggleDevice(payload));
    }
  }, [dispatch, childDevices, floor, activeItem, isEditing]);

  return {
    toggleChildren,
    removeChildren
  };
};

export default useAreaTaskerState;
