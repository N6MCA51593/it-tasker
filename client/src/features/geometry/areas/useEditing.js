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
  selectActiveGlobalUiState
} from 'app/selectors';
import * as ui from 'common/uiStates';

const useEditing = ({ mode, isGrid, getRelCoord }) => {
  const dispatch = useDispatch();
  const activeArea = useSelector(selectActiveArea);
  const activeLabel = useSelector(selectActiveLabel);
  const activeFloor = useSelector(selectActiveFloor);
  const activeDevice = useSelector(selectActiveDevice);
  const isMoving = useSelector(selectIsDeviceMoving);
  const uiState = useSelector(selectActiveGlobalUiState);

  const addDevice = (id, e) => {
    const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
    console.log(x);
    if (mode === ui.moveDeviceGeo && activeDevice) {
      dispatch(updateActiveDevice({ coords: { x, y }, area: id }));
    } else if (mode === ui.addDeviceGeo) {
      dispatch(addDeviceAction({ id, coords: { x, y }, floor: activeFloor }));
    }
  };

  const handleClickEdit = e => {
    if (mode === ui.addAreaGeo) {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      dispatch(addArea({ point: `${x},${y}`, floor: activeFloor }));
    } else if (mode === ui.moveAreaLabelGeo && activeLabel) {
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
    handleClick: uiState === ui.mainGlob ? handleClickMain : handleClickEdit,
    handleMouseMove: uiState === ui.mainGlob ? null : handleMouseMoveEdit,
    addDevice,
    activeDevice
  };
};

export default useEditing;
