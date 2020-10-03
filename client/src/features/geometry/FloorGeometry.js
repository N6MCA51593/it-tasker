import React, { memo } from 'react';
//import { useSelector } from 'react-redux';

const FloorGeometry = () => {
  //const walls = useSelector(state => Object.values(state.walls.entities));

  // const path = (() => {
  //   const reducer = (accum, wall) => {
  //     const { x1, y1, x2, y2 } = wall.coords;
  //     return accum + `M ${x1} ${y1} L ${x2} ${y2}`;
  //   };
  //   return walls.reduce(reducer, '');
  // })();
  const path =
    'M 100 50 L 2050 50M 2050 50 L 2050 500M 2050 500 L 100 500M 100 500 L 100 50M 100 350 L 150 350M 200 350 L 200 500M 300 350 L 350 350M 300 350 L 300 500M 400 500 L 400 350M 400 250 L 400 50M 100 250 L 350 250M 500 500 L 500 350M 700 250 L 700 50M 700 350 L 700 500M 900 350 L 900 500M 900 250 L 900 50M 1100 250 L 1100 50M 1100 500 L 1100 350M 1600 350 L 1600 500M 1600 250 L 1600 50M 500 350 L 650 350M 700 350 L 850 350M 900 350 L 1050 350M 1500 450 L 1500 100M 1200 100 L 1200 450M 400 250 L 600 250M 900 250 L 750 250M 900 250 L 1050 250';

  return (
    <path
      d={path}
      strokeWidth='8'
      stroke='#17161c'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  );
};

export default memo(FloorGeometry);
