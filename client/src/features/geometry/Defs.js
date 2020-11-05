import React from 'react';

const Defs = () => {
  return (
    <defs>
      <g
        stroke-width='1.5'
        stroke='currentColor'
        fill='none'
        stroke-linecap='round'
        stroke-linejoin='round'
        id='icon'
      >
        <circle cx='12' cy='12' r='9' />
        <line x1='12' y1='8' x2='12' y2='12' />
        <line x1='12' y1='16' x2='12.01' y2='16' />
      </g>
    </defs>
  );
};

export default Defs;
