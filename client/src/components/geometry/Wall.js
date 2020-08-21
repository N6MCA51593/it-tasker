import React, { memo } from 'react';
//import PropTypes from 'prop-types';

const Wall = ({ x1, y1, x2, y2, handleWallClick, mode, getRelCoord }) => {
  const r = 3;
  return (
    <g>
      <circle
        cx={x1}
        cy={y1}
        r={r}
        onClick={
          mode === 'draw'
            ? e => handleWallClick(e, { x: x1, y: y1 })
            : undefined
        }
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth='2'
        stroke='black'
        onClick={
          mode === 'draw' ? e => handleWallClick(e, getRelCoord(e)) : undefined
        }
      />
      <circle
        cx={x2}
        cy={y2}
        r={r}
        onClick={
          mode === 'draw'
            ? e => handleWallClick(e, { x: x2, y: y2 })
            : undefined
        }
      />
    </g>
  );
};

// Wall.propTypes = {
//   pointOne: PropTypes.object.isRequired,
//   pointTwo: PropTypes.object.isRequired
// };

export default memo(Wall);
