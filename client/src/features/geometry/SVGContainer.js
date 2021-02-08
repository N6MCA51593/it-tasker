import Defs from 'features/geometry/Defs';
import Grid from 'features/geometry/Grid';
import React from 'react';

const SVGContainer = (
  panHLvl,
  panVLvl,
  width,
  zoomLvl,
  height,
  gridStep,
  isGrid
) => children => {
  return (
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
      <Defs />
      {children}
    </svg>
  );
};

export default SVGContainer;
