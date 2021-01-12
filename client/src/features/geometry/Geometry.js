import React, { useRef } from 'react';
import GeometryControls from 'features/geometry/controls/GeometryControls';
import useDimensions from 'features/geometry/useDimensions';
import useCoordinates from 'features/geometry/useCoordinates';
import useZoomAndPan from 'features/geometry/controls/useZoomAndPan';
import useGrid from 'features/geometry/useGrid';
import GeometryDrawing from 'features/geometry/walls/GeometryDrawing';
import { useSelector } from 'react-redux';
import { selectActiveGlobalUiState, selectActiveGeoState } from 'app/selectors';
import InteractablesWithEditing from 'features/geometry/interactables/InteractablesWithEditing';
import Interactables from 'features/geometry/interactables/Interactables';
import { EDIT_GEOM_GLOB, EDIT_INTERACTABLES_GLOB } from 'app/constants';
import usePersistingUiState from 'app/usePersistingUiState';
import useControlEventHandlers from 'features/geometry/controls/useControlEventHandlers';

const Geometry = () => {
  const ref = useRef();
  const { width, height } = useDimensions(ref);
  const { isGrid, gridStep, toggleGrid, gridStepUp, gridStepDown } = useGrid();
  const {
    zoomLvl,
    zoomIn,
    zoomOut,
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
  usePersistingUiState({ isGrid, gridStep, panHLvl, panVLvl, zoomLvl });
  const uiState = useSelector(selectActiveGlobalUiState);
  const mode = useSelector(selectActiveGeoState);
  const {
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
    handleTouchStart
  } = useControlEventHandlers({
    mode,
    getRelCoord,
    freePan,
    setInitCoords,
    wheelZoom
  });

  return (
    <div
      className='geometry'
      ref={ref}
      onPointerDown={e => handlePointerDown(e)}
      onPointerUp={() => handlePointerUp()}
      onPointerMove={e => handlePointerMove(e)}
      onPointerLeave={() => handlePointerLeave()}
      onTouchMove={e => handlePointerMove(e)}
      onTouchStart={e => handleTouchStart(e)}
      onWheel={e => handleWheel(e)}
    >
      <div>
        {uiState === EDIT_GEOM_GLOB && (
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
        {uiState === EDIT_INTERACTABLES_GLOB && (
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
        {uiState !== EDIT_INTERACTABLES_GLOB && uiState !== EDIT_GEOM_GLOB && (
          <Interactables
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
        toggleGrid={toggleGrid}
        gridStepUp={gridStepUp}
        gridStepDown={gridStepDown}
        uiState={uiState}
        isGrid={isGrid}
        gridStep={gridStep}
      />
    </div>
  );
};

export default Geometry;
