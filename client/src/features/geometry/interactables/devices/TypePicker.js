import {
  PC_DT,
  LAPTOP_DT,
  PRINTER_DT,
  PHONE_DT,
  SOUND_DT,
  SCREEN_DT,
  NETWORK_DT,
  SERVER_DT,
  OTHER_DT
} from 'app/constants';
import React from 'react';

const TypePicker = ({ type, setType }) => {
  const types = [
    PC_DT,
    LAPTOP_DT,
    PRINTER_DT,
    PHONE_DT,
    SOUND_DT,
    SCREEN_DT,
    NETWORK_DT,
    SERVER_DT,
    OTHER_DT
  ];

  const cycle = dir => {
    const curTypePos = types.indexOf(type);
    if (dir > 0) {
      if (curTypePos !== types.length - 1) {
        setType(types[curTypePos + 1]);
      } else {
        setType(types[0]);
      }
    } else if (dir < 0) {
      if (curTypePos !== 0) {
        setType(types[curTypePos - 1]);
      } else {
        setType(types[types.length - 1]);
      }
    }
  };

  return (
    <div className='type-picker'>
      <div onClick={() => cycle(-1)}>L</div>
      <div>
        <svg>
          <g transform='scale(0.6)'>
            <use href={`#icon-${type}`} />
          </g>
        </svg>
      </div>
      <div onClick={() => cycle(1)}>R</div>
    </div>
  );
};

export default TypePicker;
