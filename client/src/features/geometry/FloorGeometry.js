import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveFloorItem } from 'app/selectors';

const FloorGeometry = () => {
  const floor = useSelector(selectActiveFloorItem);
  return (
    <path
      d={floor?.geometry}
      strokeWidth='8'
      stroke='#17161c'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  );
};

export default memo(FloorGeometry);
