import { useSelector, useDispatch } from 'react-redux';
import {
  addArea,
  updateActiveArea,
  saveArea
} from 'features/geometry/areas/areaSlice';
import { addDevice as addDeviceAction } from 'features/geometry/devices/deviceSlice';
import { updateActiveDevice } from 'features/geometry/devices/deviceSlice';
import {
  selectActiveArea,
  selectActiveLabel,
  selectActiveDevice,
  selectIsDeviceMoving,
  selectActiveFloor,
  selectActiveUiState
} from 'app/selectors';

const useEditing = ({ mode, isGrid, getRelCoord }) => {
  const dispatch = useDispatch();
  const activeArea = useSelector(selectActiveArea);
  const activeLabel = useSelector(selectActiveLabel);
  const activeFloor = useSelector(selectActiveFloor);
  const activeDevice = useSelector(selectActiveDevice);
  const isMoving = useSelector(selectIsDeviceMoving);
  const uiState = useSelector(selectActiveUiState);

  const addDevice = (id, e) => {
    const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
    if (mode === 'move-device' && activeDevice) {
      dispatch(updateActiveDevice({ coords: { x, y }, area: id }));
    } else if (mode === 'add-device') {
      dispatch(addDeviceAction({ id, coords: { x, y }, floor: activeFloor }));
    }
  };

  const handleClickEdit = e => {
    if (mode === 'draw') {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      dispatch(addArea({ point: `${x},${y}`, floor: activeFloor }));
    } else if (mode === 'label-move' && activeLabel) {
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
      dispatch(updateActiveDevice({ coords: getRelCoord(e) }));
    }
  };

  const handleClickMain = params => {};

  return {
    handleClick: uiState === 'main' ? handleClickMain : handleClickEdit,
    handleMouseMove: uiState === 'main' ? null : handleMouseMoveEdit,
    addDevice,
    activeDevice
  };
};

export default useEditing;
