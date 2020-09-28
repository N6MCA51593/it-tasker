import React, { useRef, useState, Fragment } from 'react';
import Wall from 'features/geometry/Wall';
import Grid from 'features/geometry/Grid';
import GeometryControls from 'features/geometry/GeometryControls';
import useDimensions from 'features/geometry/useDimensions';
import useCoordinates from 'features/geometry/useCoordinates';
import useZoomAndPan from 'features/geometry/useZoomAndPan';
import useGrid from 'features/geometry/useGrid';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWall,
  saveWall,
  updateActiveWall
} from 'features/geometry/wallSlice';

const GeometryDrawing = () => {
  const [mode, setMode] = useState('draw');
  const ref = useRef();
  const { width, height } = useDimensions(ref);
  const { isGrid, gridStep, toggleGrid } = useGrid();
  const {
    zoomLvl,
    zoomIn,
    zoomOut,
    panH,
    panV,
    panHLvl,
    panVLvl
  } = useZoomAndPan({ width, height });
  const { getRelCoord } = useCoordinates({
    isGrid,
    gridStep,
    zoomLvl,
    panHLvl,
    panVLvl,
    ref
  });
  const dispatch = useDispatch();
  const ids = useSelector(state => state.walls.ids);
  const activeWall = useSelector(state =>
    state.walls.activeWall ? state.walls.entities[state.walls.activeWall] : null
  );

  const handleClick = e => {
    if (mode === 'draw') {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      if (activeWall) {
        dispatch(saveWall({ x, y }));
      }

      dispatch(addWall({ x, y }));
    }
  };

  const handleMouseMove = e => {
    if (activeWall) {
      const x = getRelCoord(e).x;
      const y = getRelCoord(e).y;
      dispatch(updateActiveWall({ x, y }));
    }
  };

  return (
    <Fragment>
      <div
        ref={ref}
        onClick={e => handleClick(e)}
        onMouseMove={e => handleMouseMove(e)}
        className='draw-area'
      >
        <svg
          viewBox={`${panHLvl} ${panVLvl} ${width * zoomLvl} ${
            height * zoomLvl
          }`}
        >
          {isGrid && (
            <Grid
              panVLvl={panVLvl}
              panHLvl={panHLvl}
              width={width * zoomLvl}
              height={height * zoomLvl}
            />
          )}
          {ids.map((e, i) => (
            <Wall
              key={i}
              activeWall={activeWall ? activeWall.id : null}
              id={e}
              mode={mode}
              getRelCoord={getRelCoord}
            />
          ))}
        </svg>
      </div>
      <GeometryControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        panH={panH}
        panV={panV}
        setMode={setMode}
        toggleGrid={toggleGrid}
      />
    </Fragment>
  );
};

export default GeometryDrawing;
