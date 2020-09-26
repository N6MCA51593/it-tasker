import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWall, removeWall, finalizeWall } from '../../store/wallSlice';

const Wall = ({ mode, getRelCoord, id, activeWall }) => {
  const { x1, y1, x2, y2 } = useSelector(
    state => state.walls.entities[id].coords
  );
  const dispatch = useDispatch();

  const r = 5;
  const isActive = activeWall === id;

  const isCornerFunc = (x, y) => {
    if (Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2)) <= r) {
      return { x: x1, y: y1 };
    } else if (Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2)) <= r) {
      return { x: x2, y: y2 };
    }
    return false;
  };

  const findNearestPoint = (A, B, P) => {
    const isCorner = isCornerFunc(P.x, P.y);
    if (isCorner) {
      return isCorner;
    }

    const AB = {
      x: B.x - A.x,
      y: B.y - A.y
    };
    const k =
      ((P.x - A.x) * AB.x + (P.y - A.y) * AB.y) / (AB.x * AB.x + AB.y * AB.y);

    return {
      x: A.x + k * AB.x,
      y: A.y + k * AB.y
    };
  };

  const handleClick = e => {
    e.stopPropagation();
    if (mode === 'draw') {
      // handleWallClick(
      //   e,
      //   findNearestPoint({ x: x1, y: y1 }, { x: x2, y: y2 }, getRelCoord(e))
      // );
      const { x, y } = findNearestPoint(
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        getRelCoord(e)
      );
      activeWall
        ? dispatch(finalizeWall({ x2: x, y2: y }))
        : dispatch(addWall({ x1: x, x2: x, y1: y, y2: y }));
    } else if (mode === 'remove') {
      // handleWallClick(e, { x1, x2, y1, y2 });
      dispatch(removeWall(id));
    } else if (mode === 'move') {
      // return handleWallClick(
      //   e,
      //   isCornerFunc(getRelCoord(e).x, getRelCoord(e).y)
      // );
    }
  };
  return (
    <g onClick={e => handleClick(e)} className={isActive ? 'active' : ''}>
      <circle cx={x1} cy={y1} r={r} fill='black' />
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth='4' stroke='black' />
      <circle cx={x2} cy={y2} r={r} fill='black' />
    </g>
  );
};

export default memo(Wall);
