import React, { useState } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import FloorGeometry from 'features/geometry/FloorGeometry';
import Grid from 'features/geometry/Grid';

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
  //const dispatch = useDispatch();

  const handleClick = e => {};

  const handleMouseMove = e => {};

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
      </svg>
    </div>
  );
};

export default AreaDrawing;
