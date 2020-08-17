import React, { memo, Fragment } from 'react';
//import PropTypes from 'prop-types';

const Wall = ({ x1, y1, x2, y2, handleWallClick, mode }) => {
  return (
    <Fragment>
      <circle
        cx={x1}
        cy={y1}
        r='5'
        onClick={mode === 'draw' && (e => handleWallClick(e, { x: x1, y: y1 }))}
      />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke='black' />
      <circle
        cx={x2}
        cy={y2}
        r='5'
        onClick={mode === 'draw' && (e => handleWallClick(e, { x: x2, y: y2 }))}
      />
    </Fragment>
  );
};

// Wall.propTypes = {
//   pointOne: PropTypes.object.isRequired,
//   pointTwo: PropTypes.object.isRequired
// };

export default memo(Wall);
