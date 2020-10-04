import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Area = ({ id }) => {
  const dispatch = useDispatch();
  const points = useSelector(state => state.areas.entities[id].points);
  return (
    <polygon
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
