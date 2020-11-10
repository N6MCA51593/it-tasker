import React, { useRef, useState } from 'react';
import GeometryControls from 'features/geometry/GeometryControls';
import useDimensions from 'features/geometry/useDimensions';
import useCoordinates from 'features/geometry/useCoordinates';
import useZoomAndPan from 'features/geometry/useZoomAndPan';
import useGrid from 'features/geometry/useGrid';
import GeometryDrawing from 'features/geometry/walls/GeometryDrawing';
import { useSelector } from 'react-redux';
import { selectActiveGlobalUiState, selectActiveGeoState } from 'app/selectors';
import InteractablesWithEditing from 'features/geometry/interactables/InteractablesWithEditing';
import * as ui from 'common/uiStates';

const Geometry = () => {
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
  const uiState = useSelector(selectActiveGlobalUiState);
  const mode = useSelector(selectActiveGeoState);

  const handlePointerMove = e => {
    if (mode === ui.navGeo && isPointerDown) {
      freePan(getRelCoord(e));
    }
  };

  const handlePointerDown = e => {
    if (mode === ui.navGeo) {
      setInitCoords(getRelCoord(e));
      setIsPointerDown(true);
    }
  };

  const handlePointerUp = () => {
    if (mode === ui.navGeo) {
      setInitCoords(null);
      setIsPointerDown(false);
    }
  };

  const handlePointerLeave = () => {
    if (mode === ui.navGeo) {
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
        {uiState === ui.editGeomGlob && (
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
        {uiState !== ui.editGeomGlob && (
          <InteractablesWithEditing
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
        toggleGrid={toggleGrid}
        gridStepUp={gridStepUp}
        gridStepDown={gridStepDown}
        uiState={uiState}
      />
    </div>
  );
};

export default Geometry;
