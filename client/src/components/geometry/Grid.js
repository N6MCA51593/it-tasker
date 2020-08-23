import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Grid = ({ panHLvl, panVLvl, width, height }) => {
  return (
    <g>
      <pattern
        id='pattern-grid'
        x='-6px'
        y='-6px'
        width='50'
        height='50'
        patternUnits='userSpaceOnUse'
      >
        <path d='M5 2 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 v-2 h2 z' />
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

export default memo(Grid);
