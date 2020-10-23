import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloorGeometry from 'features/geometry/FloorGeometry';
import Grid from 'features/geometry/Grid';
import {
  addArea,
  updateActiveArea,
  saveArea
} from 'features/geometry/areas/areaSlice';
import { addDevice as addDeviceAction } from 'features/geometry/devices/deviceSlice';
import Area from 'features/geometry/areas/Area';
import Device from 'features/geometry/devices/Device';
import { updateActiveDevice } from 'features/geometry/devices/deviceSlice';
import {
  selectAllAreas,
  selectAllDevicesMemo,
  selectActiveArea,
  selectActiveLabel,
  selectActiveDevice,
  selectIsDeviceMoving,
  selectActiveFloor
} from 'app/selectors';

const AreaDrawing = ({
  mode,
  isGrid,
  getRelCoord,
  panHLvl,
  panVLvl,
  zoomLvl,
  width,
  height,
  gridStep
}) => {
  const dispatch = useDispatch();
  const activeArea = useSelector(selectActiveArea);
  const activeLabel = useSelector(selectActiveLabel);
  const activeFloor = useSelector(selectActiveFloor);
  const areaIds = useSelector(selectAllAreas);
  const deviceIds = useSelector(selectAllDevicesMemo);
  const activeDevice = useSelector(selectActiveDevice);
  const isMoving = useSelector(selectIsDeviceMoving);

  const addDevice = (id, e) => {
    const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
    if (mode === 'move-device' && activeDevice) {
      dispatch(updateActiveDevice({ coords: { x, y }, area: id }));
    } else if (mode === 'add-device') {
      dispatch(addDeviceAction({ id, coords: { x, y }, floor: activeFloor }));
    }
  };

  const handleClick = e => {
    if (mode === 'draw') {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      dispatch(addArea({ point: `${x},${y}`, floor: activeFloor }));
    } else if (mode === 'label-move' && activeLabel) {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      dispatch(saveArea({ x, y }));
    }
  };

  const handleMouseMove = e => {
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

  return (
    <div
      onClick={e => handleClick(e)}
      onMouseMove={e => handleMouseMove(e)}
      className='draw-area'
    >
      <svg
        viewBox={`${panHLvl} ${panVLvl} ${width * zoomLvl} ${height * zoomLvl}`}
      >
        {isGrid && (
          <Grid
            panVLvl={panVLvl}
            panHLvl={panHLvl}
            width={width * zoomLvl}
            height={height * zoomLvl}
            gridStep={gridStep}
          />
        )}
        <FloorGeometry />
        {areaIds.map(id => (
          <Area key={id} id={id} mode={mode} addDevice={addDevice} />
        ))}
        {deviceIds.map(id => (
          <Device key={id} id={id} mode={mode} activeDevice={activeDevice} />
        ))}
      </svg>
    </div>
  );
};

export default AreaDrawing;
