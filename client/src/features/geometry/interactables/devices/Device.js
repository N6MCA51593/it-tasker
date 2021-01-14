import React, { memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import DevicePopUpContainer from 'features/geometry/interactables/devices/DevicePopUpContainer';
import DeviceIcon from 'features/geometry/interactables/devices/DeviceIcon';
import {
  selectDeviceById,
  selectActiveGlobalUiState,
  selectDeviceActiveItemStatus,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { toggleDevice } from 'features/tasker/taskerSlice';
import { checkOffDevices } from 'features/api/checkOffDevices';
import {
  ADD_DEVICE_GEO,
  EDIT_TASKER_ITEMS_GLOB,
  MAIN_GLOB,
  MOVE_DEVICE_GEO,
  TASK_TT
} from 'app/constants';
import { setActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import DeviceMainPopUp from 'features/geometry/interactables/devices/DeviceMainPopUp';

const Device = ({ id, mode }) => {
  const dispatch = useDispatch();
  const device = useSelector(
    state => selectDeviceById(state, id),
    shallowEqual
  );
  const activeTaskerItemStatus = useSelector(state =>
    selectDeviceActiveItemStatus(state, id)
  );
  const { activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );
  const globalUiState = useSelector(selectActiveGlobalUiState);
  const isActive = useSelector(state => state.devices.activeDevice === id);
  const { status, type, floor, x, y } = device;
  const isVisible = useSelector(
    state => state.uiState.activeDeviceFilters[type]
  );

  const handleClick = () => {
    if (globalUiState === EDIT_TASKER_ITEMS_GLOB) {
      dispatch(toggleDevice({ id, floor }));
    } else if (
      activeItemType === TASK_TT &&
      typeof activeTaskerItemStatus !== 'undefined'
    ) {
      dispatch(checkOffDevices(id));
    } else if (globalUiState === MAIN_GLOB) {
      dispatch(setActiveDevice(id));
    }
  };
  const iconClassName =
    typeof activeTaskerItemStatus !== 'undefined'
      ? 'device-icon selected'
      : 'device-icon';

  if (!isVisible && typeof activeTaskerItemStatus === 'undefined') {
    return null;
  }

  return (
    <g>
      <g
        onClick={() => handleClick()}
        className={
          mode === ADD_DEVICE_GEO || (mode === MOVE_DEVICE_GEO && isActive)
            ? 'device-disabled'
            : ''
        }
      >
        <DeviceIcon type={type} x={x} y={y} className={iconClassName} />
      </g>
      {isActive && (
        <DevicePopUpContainer x={x} y={y}>
          <DeviceMainPopUp id={id} floor={floor} />
        </DevicePopUpContainer>
      )}
    </g>
  );
};

export default memo(Device);
