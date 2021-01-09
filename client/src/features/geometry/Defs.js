import {
  EDIT_GEOM_GLOB,
  EDIT_INTERACTABLES_GLOB,
  LAPTOP_DT,
  MAIN_GLOB,
  NETWORK_DT,
  OTHER_DT,
  PC_DT,
  PHONE_DT,
  PRINTER_DT,
  SCREEN_DT,
  SERVER_DT,
  SOUND_DT
} from 'app/constants';
import React, { Fragment, memo } from 'react';

const SymbolWrapper = ({ type, children }) => {
  return (
    <symbol
      width='230'
      height='220'
      viewBox='0 0 24 22'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      id={`icon-${type}`}
    >
      {children}
    </symbol>
  );
};

const Defs = () => {
  return (
    <Fragment>
      <SymbolWrapper type={SCREEN_DT}>
        <rect x='3' y='4' width='18' height='12' rx='1' />
        <line x1='7' y1='20' x2='17' y2='20' />
        <line x1='9' y1='16' x2='9' y2='20' />
        <line x1='15' y1='16' x2='15' y2='20' />
      </SymbolWrapper>
      <SymbolWrapper type={LAPTOP_DT}>
        <line x1='3' y1='19' x2='21' y2='19' />
        <rect x='5' y='6' width='14' height='10' rx='1' />
      </SymbolWrapper>
      <SymbolWrapper type={PRINTER_DT}>
        <path d='M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2' />
        <path d='M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4' />
        <rect x='7' y='13' width='10' height='8' rx='2' />
      </SymbolWrapper>
      <SymbolWrapper type={PHONE_DT}>
        <rect x='13' y='8' width='8' height='12' rx='1' />
        <path d='M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9' />
        <line x1='16' y1='9' x2='18' y2='9' />
      </SymbolWrapper>
      <SymbolWrapper type={SOUND_DT}>
        <rect x='4' y='13' rx='2' width='5' height='7' />
        <rect x='15' y='13' rx='2' width='5' height='7' />
        <path d='M4 15v-3a8 8 0 0 1 16 0v3' />
      </SymbolWrapper>
      <SymbolWrapper type={PC_DT}>
        <path d='M10 15h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h6' />
        <rect x='13' y='4' width='8' height='16' rx='2' />
        <line x1='7' y1='19' x2='10' y2='19' />
        <line x1='17' y1='8' x2='17' y2='8.01' />
        <circle cx='17' cy='16' r='1' />
        <line x1='9' y1='15' x2='9' y2='19' />
      </SymbolWrapper>
      <SymbolWrapper type={NETWORK_DT}>
        <rect x='3' y='13' width='18' height='8' rx='2' />
        <line x1='17' y1='17' x2='17' y2='17.01' />
        <line x1='13' y1='17' x2='13' y2='17.01' />
        <line x1='15' y1='13' x2='15' y2='11' />
        <path d='M11.75 8.75a4 4 0 0 1 6.5 0' />
        <path d='M8.5 6.5a8 8 0 0 1 13 0' />
      </SymbolWrapper>
      <SymbolWrapper type={SERVER_DT}>
        <rect x='3' y='4' width='18' height='8' rx='3' />
        <rect x='3' y='12' width='18' height='8' rx='3' />
        <line x1='7' y1='8' x2='7' y2='8.01' />
        <line x1='7' y1='16' x2='7' y2='16.01' />
      </SymbolWrapper>
      <SymbolWrapper type={OTHER_DT}>
        <line x1='7.5' y1='4.21' x2='7.5' y2='4.22' />
        <line x1='4.21' y1='7.5' x2='4.21' y2='7.51' />
        <line x1='3' y1='12' x2='3' y2='12.01' />
        <line x1='4.21' y1='16.5' x2='4.21' y2='16.51' />
        <line x1='7.5' y1='19.79' x2='7.5' y2='19.8' />
        <line x1='12' y1='21' x2='12' y2='21.01' />
        <line x1='16.5' y1='19.79' x2='16.5' y2='19.8' />
        <line x1='19.79' y1='16.5' x2='19.79' y2='16.51' />
        <line x1='21' y1='12' x2='21' y2='12.01' />
        <line x1='19.79' y1='7.5' x2='19.79' y2='7.51' />
        <line x1='16.5' y1='4.21' x2='16.5' y2='4.22' />
        <line x1='12' y1='3' x2='12' y2='3.01' />
      </SymbolWrapper>
      <SymbolWrapper type='logout-ic'>
        <g stroke='red'>
          <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
          <path d='M7 12h14l-3 -3m0 6l3 -3' />
        </g>
      </SymbolWrapper>
      <SymbolWrapper type={MAIN_GLOB}>
        <path d='M6 17.6l-2 -1.1v-2.5' />
        <path d='M4 10v-2.5l2 -1.1' />
        <path d='M10 4.1l2 -1.1l2 1.1' />
        <path d='M18 6.4l2 1.1v2.5' />
        <path d='M20 14v2.5l-2 1.12' />
        <path d='M14 19.9l-2 1.1l-2 -1.1' />
        <line x1='12' y1='12' x2='14' y2='10.9' />
        <line x1='18' y1='8.6' x2='20' y2='7.5' />
        <line x1='12' y1='12' x2='12' y2='14.5' />
        <line x1='12' y1='18.5' x2='12' y2='21' />
        <path d='M12 12l-2 -1.12' />
        <line x1='6' y1='8.6' x2='4' y2='7.5' />
      </SymbolWrapper>
      <SymbolWrapper type={EDIT_INTERACTABLES_GLOB}>
        <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
        <path d='M4 16v2a2 2 0 0 0 2 2h2' />
        <path d='M16 4h2a2 2 0 0 1 2 2v2' />
        <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
        <line x1='12' y1='11' x2='12' y2='11.01' />
        <path d='M12 18l-3.5 -5a4 4 0 1 1 7 0l-3.5 5' />
      </SymbolWrapper>
      <SymbolWrapper type={EDIT_GEOM_GLOB}>
        <line x1='4' y1='12' x2='20' y2='12' />
        <line x1='12' y1='4' x2='12' y2='20' />
        <line x1='4' y1='4' x2='4' y2='4.01' />
        <line x1='8' y1='4' x2='8' y2='4.01' />
        <line x1='16' y1='4' x2='16' y2='4.01' />
        <line x1='20' y1='4' x2='20' y2='4.01' />
        <line x1='4' y1='8' x2='4' y2='8.01' />
        <line x1='20' y1='8' x2='20' y2='8.01' />
        <line x1='4' y1='16' x2='4' y2='16.01' />
        <line x1='20' y1='16' x2='20' y2='16.01' />
        <line x1='4' y1='20' x2='4' y2='20.01' />
        <line x1='8' y1='20' x2='8' y2='20.01' />
        <line x1='16' y1='20' x2='16' y2='20.01' />
        <line x1='20' y1='20' x2='20' y2='20.01' />
      </SymbolWrapper>
    </Fragment>
  );
};

export default memo(Defs);
