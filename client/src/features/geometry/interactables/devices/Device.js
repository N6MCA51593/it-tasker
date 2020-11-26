import React, { memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import DevicePopUp from 'features/geometry/interactables/devices/DevicePopUp';
import DeviceOptions from 'features/geometry/interactables/devices/DeviceOptions';
import StatusIndicator from 'features/geometry/interactables/devices/StatusIndicator';
import DeviceIcon from 'features/geometry/interactables/devices/DeviceIcon';
import {
  selectDeviceById,
  selectActiveGlobalUiState,
  //selectTaskerActiveItemProperties,
  selectDeviceActiveItemStatus
} from 'app/selectors';
import {
  setActiveDevice,
  removeDevice,
  moveDevice
} from 'features/geometry/interactables/devices/deviceSlice';
import { toggleDevice } from 'features/tasker/taskerSlice';
import * as ui from 'common/uiStates';

const Device = ({ id, mode }) => {
  const dispatch = useDispatch();
  const device = useSelector(
    state => selectDeviceById(state, id),
    shallowEqual
  );
  const activeTaskerItemStatus = useSelector(state =>
    selectDeviceActiveItemStatus(state, id)
  );
  // const { activeItem, isEditing, activeItemType } = useSelector(
  //   selectTaskerActiveItemProperties,
  //   shallowEqual
  // );
  const globalUiState = useSelector(selectActiveGlobalUiState);
  const isActive = useSelector(state => state.devices.activeDevice === id);
  const { status, type, floor, x, y } = device;

  const handleClick = () => {
    if (mode === ui.navGeo && globalUiState === ui.editInteractablesGlob) {
      dispatch(setActiveDevice(id));
    } else if (mode === ui.removeDeviceGeo) {
      dispatch(removeDevice(id));
    } else if (mode === ui.moveDeviceGeo && !isActive) {
      dispatch(moveDevice(id));
    } else if (globalUiState === ui.editTaskerItemGlob) {
      dispatch(toggleDevice({ id, floor }));
    }
  };
  const iconClassName =
    activeTaskerItemStatus === false ? 'device-icon-selected' : 'device-icon';

  return (
    <g>
      <g
        onClick={() => handleClick()}
        className={
          mode === ui.addDeviceGeo || (mode === ui.moveDeviceGeo && isActive)
            ? 'device-disabled'
            : ''
        }
      >
        <StatusIndicator status={status} x={x} y={y} />
        <DeviceIcon type={type} x={x} y={y} className={iconClassName} />
      </g>
      {isActive && mode !== ui.moveDeviceGeo && (
        <DevicePopUp x={x} y={y}>
          <DeviceOptions device={device} />
        </DevicePopUp>
      )}
    </g>
  );
};

export default memo(Device);
