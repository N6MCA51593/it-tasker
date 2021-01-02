import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWallById } from 'app/selectors';
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
import { ADD_WALL_GEO, MOVE_WALL_GEO, REMOVE_WALL_GEO } from 'app/constants';
import clTern from 'common/clTern';

const Wall = ({ mode, getRelCoord, id, activeWall, activeFloor }) => {
  const dispatch = useDispatch();
  const { coords } = useSelector(state => selectWallById(state, id));
  const { x1, y1, x2, y2 } = coords;
  const r = 7;
  const isActive = activeWall === id;

  const handleClick = e => {
    e.stopPropagation();
    if (mode === ADD_WALL_GEO || (mode === MOVE_WALL_GEO && activeWall)) {
      const { x, y } = findNearestPoint(
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        getRelCoord(e),
        r,
        coords
      );
      activeWall
        ? dispatch(saveWall({ x, y }))
        : dispatch(addWall({ coords: { x, y }, floor: activeFloor }));
    } else if (mode === REMOVE_WALL_GEO) {
      dispatch(removeWall(id));
    } else if (mode === MOVE_WALL_GEO) {
      dispatch(
        moveWall({ id, coords: findFarthestCorner(getRelCoord(e), coords) })
      );
    }
  };

  const className = `wall ${clTern(isActive, 'active ')}${clTern(
    mode === REMOVE_WALL_GEO,
    'hov-remove '
  )}${clTern(mode === MOVE_WALL_GEO && !activeWall, 'hov-move')}`;

  return (
    <g onClick={e => handleClick(e)} className={className}>
      <circle cx={x1} cy={y1} r={r} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <circle cx={x2} cy={y2} r={r} />
    </g>
  );
};

export default memo(Wall);
