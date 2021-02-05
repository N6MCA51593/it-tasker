import Button from 'features/geometry/controls/Button';
import React from 'react';

const NavControls = ({ zoomIn, zoomOut, resetPosition }) => {
  return (
    <div className='nav-controls'>
      <Button handleClick={zoomIn} type='plus' mod='s hov shadow' />
      <Button handleClick={zoomOut} type='minus' mod='s hov shadow' />
      <Button handleClick={resetPosition} type='home' mod='s hov shadow' />
    </div>
  );
};

export default NavControls;
