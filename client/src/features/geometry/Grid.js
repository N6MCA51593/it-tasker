import React, { memo } from 'react';

const Grid = ({ panHLvl, panVLvl, width, height, gridStep }) => {
  return (
    <g>
      <pattern
        id='pattern-grid'
        x='-6px'
        y='-6px'
        width={gridStep}
        height={gridStep}
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

export default memo(Grid);
