import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Wall = ({ pointOne, pointTwo }) => {
  return (
    <line
      x1={pointOne.x}
      y1={pointOne.y}
      x2={pointTwo.x}
      y2={pointTwo.y}
      stroke='black'
    />
  );
};

Wall.propTypes = {
  pointOne: PropTypes.object.isRequired,
  pointTwo: PropTypes.object.isRequired
};

export default memo(Wall);
