import React, { useEffect } from 'react';
import { setUiGeoState } from 'app/uiStateSlice';
import { useDispatch } from 'react-redux';
import FloorSwitcher from 'features/geometry/controls/FloorSwitcher';
import FilterControls from 'features/geometry/controls/FilterControls';
import GlobalUiControls from 'features/geometry/controls/GlobalUiControls';
import GridControls from 'features/geometry/controls/GridControls';
import NavControls from 'features/geometry/controls/NavControls';
import GeoEditingControls from 'features/geometry/controls/GeoEditingControls';
import InteractablesEditingControls from 'features/geometry/controls/InteractablesEditingControls';
import {
  EDIT_GEOM_GLOB,
  EDIT_INTERACTABLES_GLOB,
  MAIN_GLOB,
  NAV_GEO
} from 'app/constants';

const GeometryControls = ({
  zoomIn,
  zoomOut,
  toggleGrid,
  gridStepUp,
  gridStepDown,
  uiState,
  isGrid,
  gridStep,
  resetPosition
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (uiState === MAIN_GLOB) {
      dispatch(setUiGeoState(NAV_GEO));
    }
  }, [uiState, dispatch]);

  return (
    <div className='geometry-controls' onPointerDown={e => e.stopPropagation()}>
      {uiState === EDIT_INTERACTABLES_GLOB && <InteractablesEditingControls />}
      {uiState === EDIT_GEOM_GLOB && <GeoEditingControls />}
      <NavControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetPosition={resetPosition}
      />
      <GridControls
        gridStepDown={gridStepDown}
        gridStepUp={gridStepUp}
        toggleGrid={toggleGrid}
        isGrid={isGrid}
        gridStep={gridStep}
      />
      <GlobalUiControls uiState={uiState} />
      <FloorSwitcher />
      <FilterControls />
    </div>
  );
};

export default GeometryControls;
