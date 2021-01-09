import clTern from 'common/clTern';
import React from 'react';

const Button = ({ type, handleClick, mod }) => {
  return (
    <div className={`geo-button ${clTern(mod, mod)}`} onClick={handleClick}>
      <svg viewBox='0 0 350 350'>
        <g>
          <use href={`#icon-${type}`} />
        </g>
      </svg>
    </div>
  );
};

export default Button;
