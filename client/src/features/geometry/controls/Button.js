import React from 'react';

const Button = ({ type, handleClick }) => {
  return (
    <div className='geo-button' onClick={handleClick}>
      <svg viewBox='0 0 350 350'>
        <g>
          <use href={`#icon-${type}`} />
        </g>
      </svg>
    </div>
  );
};

export default Button;
