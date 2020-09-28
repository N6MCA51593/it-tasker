import React, { useRef, useState, Fragment } from 'react';
import Grid from 'features/geometry/Grid';
import GeometryControls from 'features/controls/GeometryControls';
import useDimensions from 'features/geometry/useDimensions';
import useCoordinates from 'features/geometry/useCoordinates';
import useZoomAndPan from 'features/controls/useZoomAndPan';
import useGrid from 'features/geometry/useGrid';
import GeometryDrawing2 from 'features/geometry/GeometryDrawing2';

const GeometryArea = () => {
  const [mode, setMode] = useState('draw');
  const [isPointerDown, setIsPointerDown] = useState(false);
  const ref = useRef();
  const { width, height } = useDimensions(ref);
  const { isGrid, gridStep, toggleGrid } = useGrid();
  const {
    zoomLvl,
    zoomIn,
    zoomOut,
    panH,
    panV,
    panHLvl,
    panVLvl,
    navVB,
    setInitCoords
  } = useZoomAndPan({ width, height });
  const { getRelCoord } = useCoordinates({
    isGrid,
    gridStep,
    zoomLvl,
    panHLvl,
    panVLvl,
    ref
  });

  const handleMouseMove = e => {
    if (mode === 'nav' && isPointerDown) {
      navVB(getRelCoord(e));
    }
  };

  return (
    <Fragment>
      <div
        ref={ref}
        onMouseMove={e => handleMouseMove(e)}
        onPointerDown={e => {
          setInitCoords(getRelCoord(e));
          setIsPointerDown(true);
        }}
        onPointerUp={() => {
          setInitCoords(null);
          setIsPointerDown(false);
        }}
        className='draw-area'
      >
        <svg
          viewBox={`${panHLvl} ${panVLvl} ${width * zoomLvl} ${
            height * zoomLvl
          }`}
        >
          {isGrid && (
            <Grid
              panVLvl={panVLvl}
              panHLvl={panHLvl}
              width={width * zoomLvl}
              height={height * zoomLvl}
            />
          )}
          <GeometryDrawing2
            mode={mode}
            getRelCoord={getRelCoord}
            isGrid={isGrid}
            panVLvl={panVLvl}
            panHLvl={panHLvl}
            width={width * zoomLvl}
            height={height * zoomLvl}
          />
        </svg>
      </div>
      <GeometryControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        panH={panH}
        panV={panV}
        setMode={setMode}
        toggleGrid={toggleGrid}
      />
    </Fragment>
  );
};

export default GeometryArea;
