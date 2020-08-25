import React, { memo } from 'react';
//import PropTypes from 'prop-types';

const Wall = ({ x1, y1, x2, y2, handleWallClick, mode, getRelCoord }) => {
  const r = 5;
  return (
    <g
      onClick={handleWallClick && (e => handleWallClick(e, { x1, x2, y1, y2 }))}
    >
      <circle
        cx={x1}
        cy={y1}
        r={r}
        fill='black'
        onClick={handleWallClick && (e => handleWallClick(e, { x: x1, y: y1 }))}
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth='4'
        stroke='black'
        onClick={handleWallClick && (e => handleWallClick(e, getRelCoord(e)))}
      />
      <circle
        cx={x2}
        cy={y2}
        r={r}
        fill='black'
        onClick={handleWallClick && (e => handleWallClick(e, { x: x2, y: y2 }))}
      />
    </g>
  );
};

// Wall.propTypes = {
//   pointOne: PropTypes.object.isRequired,
//   pointTwo: PropTypes.object.isRequired
// };

export default memo(Wall);
