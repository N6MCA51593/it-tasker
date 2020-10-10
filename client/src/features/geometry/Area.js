import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeArea, redrawArea } from 'features/geometry/areaSlice';

const Area = ({ id, mode }) => {
  const dispatch = useDispatch();
  const points = useSelector(state => state.areas.entities[id].points);
  const handleClick = e => {
    if (mode === 'remove') {
      dispatch(removeArea(id));
    }
    if (mode === 'redraw') {
      dispatch(redrawArea(id));
    }
  };
  return (
    <polygon
      onClick={e => handleClick(e)}
      points={points}
      fill='#009975'
      stroke='blue'
      strokeWidth='3'
      strokeDasharray='2'
      fillRule='nonzero'
    />
  );
};

export default memo(Area);
