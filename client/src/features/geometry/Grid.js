import React, { memo } from 'react';

const Grid = ({ panHLvl, panVLvl, width, height, gridStep }) => {
  return (
    <g className='grid'>
      <pattern
        id='pattern-grid'
        x='-6.5px'
        y='-5.5px'
        width={gridStep}
        height={gridStep}
        patternUnits='userSpaceOnUse'
      >
        <path d='M6 2 h1 v3 h3 v1 h-3 v3 h-1 v-3 h-3 v-1 h3 z' />
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

export default memo(Grid);
