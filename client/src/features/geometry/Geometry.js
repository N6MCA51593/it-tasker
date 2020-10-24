import React, { useRef, useState, useEffect } from 'react';
import GeometryControls from 'features/geometry/GeometryControls';
import useDimensions from 'features/geometry/useDimensions';
import useCoordinates from 'features/geometry/useCoordinates';
import useZoomAndPan from 'features/geometry/useZoomAndPan';
import useGrid from 'features/geometry/useGrid';
import GeometryDrawing from 'features/geometry/walls/GeometryDrawing';
import AreaDrawing from 'features/geometry/areas/AreaDrawing';
import { useDispatch, useSelector } from 'react-redux';
import { generateFloors } from 'features/geometry/floors/floorSlice';
import { selectActiveUiState } from 'app/selectors';

const Geometry = () => {
  const [mode, setMode] = useState('draw');
  const [isPointerDown, setIsPointerDown] = useState(false);
  const ref = useRef();
  const { width, height } = useDimensions(ref);
  const { isGrid, gridStep, toggleGrid, gridStepUp, gridStepDown } = useGrid();
  const {
    zoomLvl,
    zoomIn,
    zoomOut,
    panH,
    panV,
    panHLvl,
    panVLvl,
    freePan,
    setInitCoords,
    wheelZoom
  } = useZoomAndPan({ width, height });
  const { getRelCoord } = useCoordinates({
    isGrid,
    gridStep,
    zoomLvl,
    panHLvl,
    panVLvl,
    ref
  });
  const dispatch = useDispatch();
  const uiState = useSelector(selectActiveUiState);

  useEffect(() => {
    dispatch(generateFloors());
  }, [dispatch]);

  const handlePointerMove = e => {
    if (mode === 'nav' && isPointerDown) {
      freePan(getRelCoord(e));
    }
  };

  const handlePointerDown = e => {
    if (mode === 'nav') {
      setInitCoords(getRelCoord(e));
      setIsPointerDown(true);
    }
  };

  const handlePointerUp = () => {
    if (mode === 'nav') {
      setInitCoords(null);
      setIsPointerDown(false);
    }
  };

  const handlePointerLeave = () => {
    if (mode === 'nav') {
      setInitCoords(null);
      setIsPointerDown(false);
    }
  };

  const handleWheel = e => {
    wheelZoom(getRelCoord(e), e.deltaY);
  };

  return (
    <div
      className='geometry'
      ref={ref}
      onPointerDown={e => handlePointerDown(e)}
      onPointerUp={() => handlePointerUp()}
      onPointerMove={e => handlePointerMove(e)}
      onPointerLeave={() => handlePointerLeave()}
      onWheel={e => handleWheel(e)}
    >
      <div>
        {uiState === 'edit-geometry' && (
          <GeometryDrawing
            mode={mode}
            isGrid={isGrid}
            getRelCoord={getRelCoord}
            panHLvl={panHLvl}
            panVLvl={panVLvl}
            zoomLvl={zoomLvl}
            width={width}
            height={height}
            gridStep={gridStep}
          />
        )}
        {uiState === 'edit-areas' && (
          <AreaDrawing
            mode={mode}
            isGrid={isGrid}
            getRelCoord={getRelCoord}
            panHLvl={panHLvl}
            panVLvl={panVLvl}
            zoomLvl={zoomLvl}
            width={width}
            height={height}
            gridStep={gridStep}
          />
        )}
      </div>
      <GeometryControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        panH={panH}
        panV={panV}
        setMode={setMode}
        toggleGrid={toggleGrid}
        gridStepUp={gridStepUp}
        gridStepDown={gridStepDown}
        uiState={uiState}
      />
    </div>
  );
};

export default Geometry;
