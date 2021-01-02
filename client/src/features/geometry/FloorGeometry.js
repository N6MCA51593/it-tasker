import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveFloorItem } from 'app/selectors';

const FloorGeometry = () => {
  const floor = useSelector(selectActiveFloorItem);
  return <path d={floor?.geometry} className='floor-geometry' />;
};

export default memo(FloorGeometry);
