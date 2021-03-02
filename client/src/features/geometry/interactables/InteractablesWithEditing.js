import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addArea,
  updateActiveArea,
  saveArea
} from 'features/geometry/interactables/areas/areaSlice';
import { addDevice as addDeviceAction } from 'features/geometry/interactables/devices/deviceSlice';
import { updateActiveDevice } from 'features/geometry/interactables/devices/deviceSlice';
import {
  selectActiveArea,
  selectActiveLabel,
  selectActiveDevice,
  selectIsDeviceMoving,
  selectActiveFloor
} from 'app/selectors';
import Interactables from 'features/geometry/interactables/Interactables';
import {
  ADD_AREA_GEO,
  ADD_DEVICE_GEO,
  MOVE_AREA_LABEL_GEO,
  MOVE_DEVICE_GEO
} from 'app/constants';

const InteractablesWithEditing = InteractablesComponent =>
  function Composed(props) {
    const dispatch = useDispatch();
    const activeArea = useSelector(selectActiveArea);
    const activeLabel = useSelector(selectActiveLabel);
    const activeFloor = useSelector(selectActiveFloor);
    const activeDevice = useSelector(selectActiveDevice);
    const isMoving = useSelector(selectIsDeviceMoving);
    const { isGrid, getRelCoord, mode } = props;

    const addDevice = (id, e) => {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      if (mode === MOVE_DEVICE_GEO && activeDevice) {
        dispatch(updateActiveDevice({ x, y, area: id }));
      } else if (mode === ADD_DEVICE_GEO) {
        dispatch(addDeviceAction({ id, x, y, floor: activeFloor }));
      }
    };

    const handleClickEdit = e => {
      if (mode === ADD_AREA_GEO) {
        const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
        dispatch(addArea({ point: `${x},${y}`, floor: activeFloor }));
      } else if (mode === MOVE_AREA_LABEL_GEO && activeLabel) {
        const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
        dispatch(saveArea({ x, y }));
      }
    };

    const handleMouseMoveEdit = e => {
      if (activeLabel) {
        const { x, y } = getRelCoord(e);
        dispatch(updateActiveArea({ x, y }));
      } else if (activeArea) {
        const { x, y } = getRelCoord(e);
        dispatch(updateActiveArea(`${x},${y}`));
      } else if (isMoving && activeDevice) {
        const { x, y } = getRelCoord(e);
        dispatch(updateActiveDevice({ x, y }));
      }
    };

    return (
      <InteractablesComponent
        handleClick={handleClickEdit}
        handleMouseMove={handleMouseMoveEdit}
        addDevice={addDevice}
        {...props}
      />
    );
  };

export default InteractablesWithEditing(Interactables);
