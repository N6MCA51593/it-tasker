import React, { memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectActiveGlobalUiState,
  selectAreaById,
  selectIsAreaHighlighted
} from 'app/selectors';
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
  MAIN_GLOB,
  MOVE_DEVICE_GEO,
  REDRAW_AREA_GEO,
  REMOVE_AREA_GEO
} from 'app/constants';
import clTern from 'common/clTern';

const Area = ({ id, mode, addDevice }) => {
  const { points, name, floor, labelCoords: coords } = useSelector(state =>
    selectAreaById(state, id)
  );

  const globalUiState = useSelector(selectActiveGlobalUiState);
  const isAreaHighlightedSelector = useMemo(selectIsAreaHighlighted, []);
  const isAreaHighlighted = useSelector(state =>
    isAreaHighlightedSelector(state, id)
  );
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

  const hov = () => {
    let className = 'hov ';
    if (globalUiState === EDIT_TASKER_ITEMS_GLOB) {
      return className + 'tasker';
    } else if (mode === REMOVE_AREA_GEO) {
      return className + 'remove';
    } else if (mode === REDRAW_AREA_GEO) {
      return className + 'redraw';
    }
    return '';
  };

  return (
    <g
      className={`area-group ${hov()} ${clTern(
        isAreaHighlighted,
        globalUiState === MAIN_GLOB ? 'area-active-tasks' : 'area-selected'
      )}`}
    >
      <polygon
        onClick={e => handleClick(e)}
        points={points.join(' ')}
        className='area'
      />
      {coords && !isNaN(coords.x) && (
        <AreaNameLabel name={name} coords={coords} mode={mode} id={id} />
      )}
    </g>
  );
};

export default memo(Area);
