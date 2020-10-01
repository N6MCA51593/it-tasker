import React from 'react';
import { useSelector } from 'react-redux';

const FloorGeometry = () => {
  const walls = useSelector(state => Object.values(state.walls.entities));

  const path = (() => {
    const reducer = (accum, wall) => {
      const { x1, y1, x2, y2 } = wall.coords;
      return accum + `M ${x1} ${y1} L ${x2} ${y2}`;
    };
    return walls.reduce(reducer, '');
  })();

  return (
    <path
      d={path}
      strokeWidth='8'
      stroke='#17161c'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  );
};

export default FloorGeometry;
