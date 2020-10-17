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
import DeviceDrawing from 'features/geometry/devices/DeviceDrawing';

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
  const { activeArea, activeLabel } = useSelector(state => {
    return {
      activeArea: state.areas.activeArea,
      activeLabel: state.areas.activeLabel
    };
  });
  const ids = useSelector(state => state.areas.ids);

  const addDevice = (id, e) => {
    const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
    dispatch(addDeviceAction({ id, coords: { x, y } }));
  };

  const handleClick = e => {
    if (mode === 'draw') {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      dispatch(addArea(`${x},${y}`));
    }

    if (mode === 'label-move' && activeLabel) {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      dispatch(saveArea({ x, y }));
    }
  };

  const handleMouseMove = e => {
    if (activeArea) {
      const { x, y } = getRelCoord(e);
      dispatch(updateActiveArea(`${x},${y}`));
    }

    if (activeLabel) {
      const { x, y } = getRelCoord(e);
      dispatch(updateActiveArea({ x, y }));
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
        {ids.map(id => (
          <Area key={id} id={id} mode={mode} addDevice={addDevice} />
        ))}
        <DeviceDrawing isGrid={isGrid} getRelCoord={getRelCoord} mode={mode} />
      </svg>
    </div>
  );
};

export default AreaDrawing;
