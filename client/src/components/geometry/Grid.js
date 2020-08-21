import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Grid = ({ isEnabled, panHLvl, panVLvl, width, height }) => {
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
        x={panHLvl + 'px'}
        y={panVLvl + 'px'}
        width={width}
        height={height}
        fill='url(#pattern-grid)'
        preserveAspectRatio='none'
      ></rect>
    </g>
  );
};

Grid.propTypes = {};

export default Grid;
