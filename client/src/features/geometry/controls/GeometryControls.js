import React, { useEffect } from 'react';
import {
  cancelDrawing,
  cancelChanges as cancelWallChanges
} from 'features/geometry/walls/wallSlice';
import { updateGeometry } from 'features/api/updateGeometry';
import { updateInteractables } from 'features/api/updateInteractables';
import {
  saveArea,
  cancelChanges as cancelInteractablesChanges
} from 'features/geometry/interactables/areas/areaSlice';
import { setUiGeoState } from 'app/uiStateSlice';
import { useDispatch } from 'react-redux';
import * as ui from 'app/constants';
import FloorSwitcher from 'features/geometry/controls/FloorSwitcher';
import FilterControls from 'features/geometry/controls/FilterControls';
import GlobalUiControls from 'features/geometry/controls/GlobalUiControls';
import GridControls from 'features/geometry/controls/GridControls';
import NavControls from 'features/geometry/controls/NavControls';

const GeometryControls = ({
  zoomIn,
  zoomOut,
  toggleGrid,
  gridStepUp,
  gridStepDown,
  uiState,
  isGrid,
  gridStep
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (uiState === ui.MAIN_GLOB) {
      dispatch(setUiGeoState(ui.NAV_GEO));
    }
  }, [uiState, dispatch]);

  return (
    <div className='geometry-controls' onPointerDown={e => e.stopPropagation()}>
      {uiState === ui.EDIT_INTERACTABLES_GLOB && (
        <div className='device-controls'>
          <button onClick={() => dispatch(setUiGeoState(ui.ADD_DEVICE_GEO))}>
            Add
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.REMOVE_DEVICE_GEO))}>
            Remove
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.MOVE_DEVICE_GEO))}>
            Move
          </button>
        </div>
      )}
      {uiState === ui.EDIT_INTERACTABLES_GLOB && (
        <div className='area-controls'>
          <button onClick={() => dispatch(setUiGeoState(ui.NAV_GEO))}>
            Nav
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.ADD_AREA_GEO))}>
            Draw
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.REMOVE_AREA_GEO))}>
            Remove
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.REDRAW_AREA_GEO))}>
            Redraw
          </button>
          <button onClick={() => dispatch(saveArea())}>Save Area</button>
          <button
            onClick={() => dispatch(setUiGeoState(ui.MOVE_AREA_LABEL_GEO))}
          >
            Move Label
          </button>
          <button
            onClick={() => dispatch(setUiGeoState(ui.RENAME_AREA_LABEL_GEO))}
          >
            Rename Label
          </button>
          <button onClick={() => dispatch(updateInteractables())}>Save</button>
          <button onClick={() => dispatch(cancelInteractablesChanges())}>
            Cancel
          </button>
        </div>
      )}
      {uiState === ui.EDIT_GEOM_GLOB && (
        <div className='wall-controls'>
          <button onClick={() => dispatch(setUiGeoState(ui.NAV_GEO))}>
            Nav
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.ADD_WALL_GEO))}>
            Draw
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.REMOVE_WALL_GEO))}>
            Remove
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.MOVE_WALL_GEO))}>
            Move
          </button>
          <button onClick={() => dispatch(cancelDrawing())}>
            Cancel Drawing
          </button>
          <button onClick={() => dispatch(updateGeometry())}>Save</button>
          <button onClick={() => dispatch(cancelWallChanges())}>Cancel</button>
        </div>
      )}
      <NavControls zoomIn={zoomIn} zoomOut={zoomOut} />
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
