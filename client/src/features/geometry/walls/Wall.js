import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWall,
  removeWall,
  saveWall,
  moveWall
} from 'features/geometry/walls/wallSlice';
import {
  findFarthestCorner,
  findNearestPoint
} from 'features/geometry/geometryMathFuncs';

const Wall = ({ mode, getRelCoord, id, activeWall }) => {
  const dispatch = useDispatch();
  const coords = useSelector(state => state.walls.entities[id].coords);
  const { x1, y1, x2, y2 } = coords;
  const r = 7;
  const isActive = activeWall === id;

  const handleClick = e => {
    e.stopPropagation();
    if (mode === 'draw' || (mode === 'move' && activeWall)) {
      const { x, y } = findNearestPoint(
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        getRelCoord(e),
        r,
        coords
      );
      activeWall ? dispatch(saveWall({ x, y })) : dispatch(addWall({ x, y }));
    } else if (mode === 'remove') {
      dispatch(removeWall(id));
    } else if (mode === 'move') {
      dispatch(
        moveWall({ id, coords: findFarthestCorner(getRelCoord(e), coords) })
      );
    }
  };
  return (
    <g onClick={e => handleClick(e)} className={isActive ? 'active' : ''}>
      <circle cx={x1} cy={y1} r={r} fill='#17161c' />
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth='5' stroke='#17161c' />
      <circle cx={x2} cy={y2} r={r} fill='#17161c' />
    </g>
  );
};

export default memo(Wall);
