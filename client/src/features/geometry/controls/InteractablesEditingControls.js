import {
  ADD_AREA_GEO,
  ADD_DEVICE_GEO,
  MOVE_AREA_LABEL_GEO,
  MOVE_DEVICE_GEO,
  NAV_GEO,
  REDRAW_AREA_GEO,
  REMOVE_AREA_GEO,
  REMOVE_DEVICE_GEO,
  RENAME_AREA_LABEL_GEO
} from 'app/constants';
import { selectActiveGeoState } from 'app/selectors';
import { setUiGeoState } from 'app/uiStateSlice';
import clTern from 'common/clTern';
import { updateInteractables } from 'features/api/updateInteractables';
import EditingControlsContainer from 'features/geometry/controls/EditingControlsContainer';
import LabeledButton from 'features/geometry/controls/LabeledButton';
import {
  cancelChanges
  //saveArea
} from 'features/geometry/interactables/areas/areaSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InteractablesEditingControls = () => {
  const dispatch = useDispatch();
  const activeGeoState = useSelector(selectActiveGeoState);
  return (
    <EditingControlsContainer>
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(NAV_GEO))}
        label='Navigate'
        type={NAV_GEO}
        mod={clTern(activeGeoState === NAV_GEO, 'active')}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(ADD_AREA_GEO))}
        label='Draw new areas'
        type='plus-squared'
        mod={clTern(activeGeoState === ADD_AREA_GEO, 'active')}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(REMOVE_AREA_GEO))}
        label='Remove areas'
        type='erase'
        mod={clTern(activeGeoState === REMOVE_AREA_GEO, 'active')}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(REDRAW_AREA_GEO))}
        label='Redraw existing areas'
        type='replace'
        mod={clTern(activeGeoState === REDRAW_AREA_GEO, 'active')}
      />
      {/* <button onClick={() => dispatch(saveArea())}>Save Area</button> */}
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(MOVE_AREA_LABEL_GEO))}
        label='Move area labels'
        type='move-label'
        mod={clTern(activeGeoState === MOVE_AREA_LABEL_GEO, 'active')}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(RENAME_AREA_LABEL_GEO))}
        label='Rename area labels'
        type='strikethrough'
        mod={clTern(activeGeoState === RENAME_AREA_LABEL_GEO, 'active')}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(ADD_DEVICE_GEO))}
        label='Add devices'
        type='plus'
        mod={clTern(activeGeoState === ADD_DEVICE_GEO, 'active')}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(REMOVE_DEVICE_GEO))}
        label='Remove devices'
        type='trash'
        mod={clTern(activeGeoState === REMOVE_DEVICE_GEO, 'active')}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(MOVE_DEVICE_GEO))}
        label='Move devices'
        type='move'
        mod={clTern(activeGeoState === MOVE_DEVICE_GEO, 'active')}
      />
      <button onClick={() => dispatch(updateInteractables())}>Save</button>
      <button onClick={() => dispatch(cancelChanges())}>Cancel</button>
    </EditingControlsContainer>
  );
};

export default InteractablesEditingControls;
