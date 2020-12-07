import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveGlobalUiState, selectAreaById } from 'app/selectors';
import {
  removeArea,
  redrawArea
} from 'features/geometry/interactables/areas/areaSlice';
import AreaNameLabel from 'features/geometry/interactables/areas/AreaNameLabel';
import useAreaTaskerState from 'features/tasker/useAreaTaskerState';
import {
  ADD_DEVICE_GEO,
  EDIT_INTERACTABLES_GLOB,
  EDIT_TASKER_ITEMS_GLOB,
  MOVE_DEVICE_GEO,
  REDRAW_AREA_GEO,
  REMOVE_AREA_GEO
} from 'app/constants';

const Area = ({ id, mode, addDevice }) => {
  const { points, name, floor, labelCoords: coords } = useSelector(state =>
    selectAreaById(state, id)
  );
  const globalUiState = useSelector(selectActiveGlobalUiState);
  const dispatch = useDispatch();
  const { toggleChildren } = useAreaTaskerState(id, floor);

  const handleClick = e => {
    if (globalUiState === EDIT_INTERACTABLES_GLOB) {
      if (mode === REMOVE_AREA_GEO) {
        dispatch(removeArea(id));
      } else if (mode === REDRAW_AREA_GEO) {
        dispatch(redrawArea(id));
      } else if (mode === ADD_DEVICE_GEO || mode === MOVE_DEVICE_GEO) {
        addDevice(id, e);
      }
    } else if (globalUiState === EDIT_TASKER_ITEMS_GLOB) {
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
