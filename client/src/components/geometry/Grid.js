import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Grid = ({ isEnabled, width, height }) => {
  return (
    <g>
      <pattern
        id='pattern-grid'
        x='0'
        y='0'
        width='50'
        height='50'
        patternUnits='userSpaceOnUse'
      >
        <circle cx='2' cy='2' r='2'></circle>
      </pattern>
      <rect
        x='-25%'
        y='-25%'
        width='200%'
        height='200%'
        fill='url(#pattern-grid)'
      ></rect>
    </g>
  );
};

Grid.propTypes = {};

export default Grid;
