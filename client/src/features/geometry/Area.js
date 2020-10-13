import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeArea, redrawArea } from 'features/geometry/areaSlice';
import RoomNameLabel from 'features/geometry/RoomNameLabel';

const Area = ({ id, mode }) => {
  const dispatch = useDispatch();
  const { points, name, labelCoords: coords } = useSelector(
    state => state.areas.entities[id]
  );
  const handleClick = e => {
    if (mode === 'remove') {
      dispatch(removeArea(id));
    }
    if (mode === 'redraw') {
      dispatch(redrawArea(id));
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
      {coords && (
        <RoomNameLabel name={name} coords={coords} mode={mode} id={id} />
      )}
    </g>
  );
};

export default memo(Area);
