import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloorGeometry from 'features/geometry/FloorGeometry';
import Grid from 'features/geometry/Grid';
import { addArea, updateActiveArea } from 'features/geometry/areaSlice';
import Area from 'features/geometry/Area';

const AreaDrawing = ({
  mode,
  isGrid,
  getRelCoord,
  panHLvl,
  panVLvl,
  zoomLvl,
  width,
  height
}) => {
  const dispatch = useDispatch();
  const activeArea = useSelector(state =>
    state.areas.activeArea ? state.areas.entities[state.areas.activeArea] : null
  );
  const ids = useSelector(state => state.areas.ids);

  const handleClick = e => {
    const { x, y } = isGrid ? getRelCoord(e, true) : getRelCoord(e);
    dispatch(addArea(`${x}, ${y}`));
  };

  const handleMouseMove = e => {
    if (activeArea) {
      const { x, y } = getRelCoord(e);
      dispatch(updateActiveArea(`${x}, ${y}`));
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
          />
        )}
        <FloorGeometry />
        {ids.map(id => (
          <Area key={id} id={id} />
        ))}
      </svg>
    </div>
  );
};

export default AreaDrawing;
