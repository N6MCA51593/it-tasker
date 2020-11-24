import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveGlobalUiState, selectAreaById } from 'app/selectors';
import {
  removeArea,
  redrawArea
} from 'features/geometry/interactables/areas/areaSlice';
import AreaNameLabel from 'features/geometry/interactables/areas/AreaNameLabel';
import * as ui from 'common/uiStates';
import useAreaTaskerState from 'features/tasker/useAreaTaskerState';

const Area = ({ id, mode, addDevice }) => {
  const { points, name, floor, labelCoords: coords } = useSelector(state =>
    selectAreaById(state, id)
  );
  const globalUiState = useSelector(selectActiveGlobalUiState);
  const dispatch = useDispatch();
  const { toggleChildren } = useAreaTaskerState(id, floor);

  const handleClick = e => {
    if (globalUiState === ui.editInteractablesGlob) {
      if (mode === ui.removeAreaGeo) {
        dispatch(removeArea(id));
      } else if (mode === ui.redrawAreaGeo) {
        dispatch(redrawArea(id));
      } else if (mode === ui.addDeviceGeo || mode === ui.moveDeviceGeo) {
        addDevice(id, e);
      }
    } else if (globalUiState === ui.editTaskerItemGlob) {
      toggleChildren();
    }
  };

  return (
    <g>
      <polygon
        onClick={e => handleClick(e)}
        points={points.join(' ')}
        fill='#009975'
        stroke='blue'
        strokeWidth='3'
        strokeDasharray='2'
        fillRule='nonzero'
      />
      {coords && !isNaN(coords.x) && (
        <AreaNameLabel name={name} coords={coords} mode={mode} id={id} />
      )}
    </g>
  );
};

export default memo(Area);
