import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeArea, redrawArea } from 'features/geometry/areas/areaSlice';
import AreaNameLabel from 'features/geometry/areas/AreaNameLabel';

const Area = ({ id, mode, addDevice }) => {
  const dispatch = useDispatch();
  const { points, name, labelCoords: coords } = useSelector(
    state => state.areas.entities[id]
  );
  const handleClick = e => {
    if (mode === 'remove') {
      dispatch(removeArea(id));
    } else if (mode === 'redraw') {
      dispatch(redrawArea(id));
    } else if (mode === 'add-device' || mode === 'move-device') {
      addDevice(id, e);
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
