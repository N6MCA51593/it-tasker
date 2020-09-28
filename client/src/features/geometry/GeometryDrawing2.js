import React from 'react';
import Wall from 'features/geometry/Wall';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWall,
  saveWall,
  updateActiveWall
} from 'features/geometry/wallSlice';

const GeometryDrawing2 = ({
  mode,
  getRelCoord,
  isGrid,
  panHLvl,
  panVLvl,
  width,
  height
}) => {
  const dispatch = useDispatch();
  const ids = useSelector(state => state.walls.ids);
  const activeWall = useSelector(state =>
    state.walls.activeWall ? state.walls.entities[state.walls.activeWall] : null
  );

  const handleClick = e => {
    console.log('object');
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
    <rect
      onClick={e => handleClick(e)}
      onMouseMove={e => handleMouseMove(e)}
      x={panHLvl + 'px'}
      y={panVLvl + 'px'}
      width={width}
      height={height}
      fill='none'
    >
      {ids.map((e, i) => (
        <Wall
          key={i}
          activeWall={activeWall ? activeWall.id : null}
          id={e}
          mode={mode}
          getRelCoord={getRelCoord}
        />
      ))}
    </rect>
  );
};

export default GeometryDrawing2;
