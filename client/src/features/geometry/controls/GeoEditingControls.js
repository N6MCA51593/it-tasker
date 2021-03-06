import React from 'react';
import { setUiGeoState } from 'app/uiStateSlice';
import { updateGeometry } from 'features/api/updateGeometry';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelChanges,
  cancelDrawing
} from 'features/geometry/walls/wallSlice';
import { ADD_WALL_GEO, MOVE_WALL_GEO, REMOVE_WALL_GEO } from 'app/constants';
import EditingControlsContainer from 'features/geometry/controls/EditingControlsContainer';
import LabeledButton from 'features/geometry/controls/LabeledButton';
import { selectActiveGeoState } from 'app/selectors';
import clTern from 'common/clTern';
import GeoFloorImporter from 'features/geometry/controls/GeoFloorImporter';

const GeoEditingControls = () => {
  const dispatch = useDispatch();
  const activeGeoState = useSelector(selectActiveGeoState);
  const activeWall = useSelector(state => state.walls.activeWall);
  const isCancelable = activeGeoState === ADD_WALL_GEO && activeWall;

  const modFn = mode => {
    if (activeGeoState === mode) {
      return 'active';
    } else if (activeWall && mode !== activeGeoState) {
      return 'disabled';
    }
  };

  return (
    <EditingControlsContainer
      save={() => dispatch(updateGeometry())}
      cancel={() => dispatch(cancelChanges())}
      isDisabled={activeWall}
    >
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(ADD_WALL_GEO))}
        label='Draw walls'
        type='plus'
        mod={modFn(ADD_WALL_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(REMOVE_WALL_GEO))}
        label='Remove walls'
        type='erase'
        mod={modFn(REMOVE_WALL_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(MOVE_WALL_GEO))}
        label='Move wall point'
        type='move'
        mod={modFn(MOVE_WALL_GEO)}
      />
      <GeoFloorImporter
        render={handleClick => (
          <LabeledButton
            handleClick={handleClick}
            label='Import from level...'
            type='import'
            mod={modFn()}
          />
        )}
      />
      <LabeledButton
        handleClick={() => dispatch(cancelDrawing())}
        label='Cancel drawing'
        type='x'
        mod={clTern(!isCancelable, 'disabled')}
      />
    </EditingControlsContainer>
  );
};

export default GeoEditingControls;
