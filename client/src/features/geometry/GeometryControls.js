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
} from 'features/geometry/areas/areaSlice';
import { setUiGlobalState, setUiGeoState } from 'app/uiStateSlice';
import { useDispatch } from 'react-redux';
import * as ui from 'common/uiStates';

const GeometryControls = ({
  zoomIn,
  zoomOut,
  panH,
  panV,
  toggleGrid,
  gridStepUp,
  gridStepDown,
  uiState
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (uiState === ui.mainGlob) {
      dispatch(setUiGeoState(ui.navGeo));
    }
  }, [uiState, dispatch]);

  return (
    <div className='geometry-controls'>
      {uiState === ui.editAreasGlob && (
        <div className='device-controls'>
          <button onClick={() => dispatch(setUiGeoState(ui.addDeviceGeo))}>
            Add
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.removeDeviceGeo))}>
            Remove
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.moveDeviceGeo))}>
            Move
          </button>
        </div>
      )}
      {uiState === ui.editAreasGlob && (
        <div className='area-controls'>
          <button onClick={() => dispatch(setUiGeoState(ui.navGeo))}>
            Nav
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.addAreaGeo))}>
            Draw
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.removeAreaGeo))}>
            Remove
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.redrawAreaGeo))}>
            Redraw
          </button>
          <button onClick={() => dispatch(saveArea())}>Save Area</button>
          <button onClick={() => dispatch(setUiGeoState(ui.moveAreaLabelGeo))}>
            Move Label
          </button>
          <button
            onClick={() => dispatch(setUiGeoState(ui.renameAreaLabelGeo))}
          >
            Rename Label
          </button>
          <button onClick={() => dispatch(updateInteractables())}>Save</button>
          <button onClick={() => dispatch(cancelInteractablesChanges())}>
            Cancel
          </button>
        </div>
      )}
      {uiState === ui.editGeomGlob && (
        <div className='wall-controls'>
          <button onClick={() => dispatch(setUiGeoState(ui.navGeo))}>
            Nav
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.addWallGeo))}>
            Draw
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.removeWallGeo))}>
            Remove
          </button>
          <button onClick={() => dispatch(setUiGeoState(ui.moveWallGeo))}>
            Move
          </button>
          <button onClick={() => dispatch(cancelDrawing())}>
            Cancel Drawing
          </button>
          <button onClick={() => dispatch(updateGeometry())}>Save</button>
          <button onClick={() => dispatch(cancelWallChanges())}>Cancel</button>
        </div>
      )}
      <div className='nav-controls'>
        <button onClick={() => toggleGrid()}>Grid</button>
        <button onClick={() => gridStepUp()}>^</button>
        <button onClick={() => gridStepDown()}>⌄</button>
        <button onClick={() => zoomIn()}> + </button>
        <button onClick={() => zoomOut()}> - </button>
        <button onClick={() => panV(-1)}> T </button>
        <button onClick={() => panV()}> B </button>
        <button onClick={() => panH(-1)}> L </button>
        <button onClick={() => panH()}> R </button>
      </div>
      <div className='state-nav-controls'>
        <button onClick={() => dispatch(setUiGlobalState(ui.mainGlob))}>
          Main
        </button>
        <button onClick={() => dispatch(setUiGlobalState(ui.editGeomGlob))}>
          Geom
        </button>
        <button onClick={() => dispatch(setUiGlobalState(ui.editAreasGlob))}>
          Areas/Dev
        </button>
      </div>
    </div>
  );
};

export default GeometryControls;
