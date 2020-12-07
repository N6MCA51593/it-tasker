import React from 'react';
import Wall from 'features/geometry/walls/Wall';
import Grid from 'features/geometry/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectActiveFloorWalls,
  selectActiveWallItem,
  selectActiveFloor
} from 'app/selectors';
import {
  addWall,
  saveWall,
  updateActiveWall
} from 'features/geometry/walls/wallSlice';
import { ADD_WALL_GEO, MOVE_WALL_GEO } from 'app/constants';

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
  const ids = useSelector(selectActiveFloorWalls);
  const activeWall = useSelector(selectActiveWallItem);
  const activeFloor = useSelector(selectActiveFloor);

  const handleClick = e => {
    if (mode === ADD_WALL_GEO || MOVE_WALL_GEO) {
      const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
      if (activeWall) {
        dispatch(saveWall({ x, y }));
      }

      if (mode === ADD_WALL_GEO) {
        dispatch(addWall({ coords: { x, y }, floor: activeFloor }));
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
            activeFloor={activeFloor}
          />
        ))}
      </svg>
    </div>
  );
};

export default GeometryDrawing;
