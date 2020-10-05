import React from 'react';
import Wall from 'features/geometry/Wall';
import Grid from 'features/geometry/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWall,
  saveWall,
  updateActiveWall
} from 'features/geometry/wallSlice';

const GeometryDrawing = ({
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
  const ids = useSelector(state => state.walls.ids);
  const activeWall = useSelector(state =>
    state.walls.activeWall ? state.walls.entities[state.walls.activeWall] : null
  );

  const handleClick = e => {
    if (mode === 'draw' || 'move') {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      if (activeWall) {
        dispatch(saveWall({ x, y }));
      }

      if (mode === 'draw') {
        dispatch(addWall({ x, y }));
      }
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
  );
};

export default GeometryDrawing;
