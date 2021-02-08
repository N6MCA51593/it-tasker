import React from 'react';
import Wall from 'features/geometry/walls/Wall';
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
import { Fragment } from 'react';

const GeometryDrawing = ({ mode, isGrid, getRelCoord, SVGContainer }) => {
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
      {SVGContainer(
        <Fragment>
          {ids.map(id => (
            <Wall
              key={id}
              activeWall={activeWall ? activeWall.id : null}
              id={id}
              mode={mode}
              getRelCoord={getRelCoord}
              activeFloor={activeFloor}
            />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default GeometryDrawing;
