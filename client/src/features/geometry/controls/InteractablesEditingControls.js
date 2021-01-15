import {
  ADD_AREA_GEO,
  ADD_DEVICE_GEO,
  EDIT_DEVICE_GEO,
  MOVE_AREA_LABEL_GEO,
  MOVE_DEVICE_GEO,
  REDRAW_AREA_GEO,
  REMOVE_AREA_GEO,
  REMOVE_DEVICE_GEO,
  RENAME_AREA_LABEL_GEO
} from 'app/constants';
import {
  selectActiveArea,
  selectActiveDevice,
  selectActiveGeoState,
  selectActiveLabel
} from 'app/selectors';
import { setUiGeoState } from 'app/uiStateSlice';
import clTern from 'common/clTern';
import { updateInteractables } from 'features/api/updateInteractables';
import EditingControlsContainer from 'features/geometry/controls/EditingControlsContainer';
import LabeledButton from 'features/geometry/controls/LabeledButton';
import {
  cancelChanges,
  saveArea
} from 'features/geometry/interactables/areas/areaSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InteractablesEditingControls = () => {
  const dispatch = useDispatch();
  const activeGeoState = useSelector(selectActiveGeoState);
  const activeArea = useSelector(selectActiveArea);
  const activeDevice = useSelector(selectActiveDevice);
  const activeLabel = useSelector(selectActiveLabel);

  const isDisabled = geo => {
    const isDisabling = {
      [MOVE_AREA_LABEL_GEO]: true,
      [ADD_AREA_GEO]: true,
      [ADD_DEVICE_GEO]: true,
      [EDIT_DEVICE_GEO]: true,
      [MOVE_DEVICE_GEO]: true
    };
    if (activeArea || activeDevice || activeLabel) {
      if (
        (isDisabling[activeGeoState] && geo === activeGeoState) ||
        !isDisabling[activeGeoState]
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const mod = geo => {
    return `${clTern(activeGeoState === geo, 'active ')}${clTern(
      isDisabled(geo),
      'disabled'
    )}`;
  };

  return (
    <EditingControlsContainer
      save={() => dispatch(updateInteractables())}
      cancel={() => dispatch(cancelChanges())}
      isDisabled={activeArea || activeDevice || activeLabel}
    >
      {activeGeoState === ADD_AREA_GEO && activeArea ? (
        <LabeledButton
          handleClick={() => dispatch(saveArea())}
          label='Save area'
          type='save'
        />
      ) : (
        <LabeledButton
          handleClick={() => dispatch(setUiGeoState(ADD_AREA_GEO))}
          label='Draw areas'
          type='plus-squared'
          mod={mod(ADD_AREA_GEO)}
        />
      )}
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(REMOVE_AREA_GEO))}
        label='Remove areas'
        type='erase'
        mod={mod(REMOVE_AREA_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(REDRAW_AREA_GEO))}
        label='Redraw existing areas'
        type='replace'
        mod={mod(REDRAW_AREA_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(MOVE_AREA_LABEL_GEO))}
        label='Move area labels'
        type='move-label'
        mod={mod(MOVE_AREA_LABEL_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(RENAME_AREA_LABEL_GEO))}
        label='Rename area labels'
        type='strikethrough'
        mod={mod(RENAME_AREA_LABEL_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(ADD_DEVICE_GEO))}
        label='Add devices'
        type='plus'
        mod={mod(ADD_DEVICE_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(EDIT_DEVICE_GEO))}
        label='Edit devices'
        type='edit'
        mod={mod(EDIT_DEVICE_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(MOVE_DEVICE_GEO))}
        label='Move devices'
        type='move'
        mod={mod(MOVE_DEVICE_GEO)}
      />
      <LabeledButton
        handleClick={() => dispatch(setUiGeoState(REMOVE_DEVICE_GEO))}
        label='Remove devices'
        type='trash'
        mod={mod(REMOVE_DEVICE_GEO)}
      />
    </EditingControlsContainer>
  );
};

export default InteractablesEditingControls;
