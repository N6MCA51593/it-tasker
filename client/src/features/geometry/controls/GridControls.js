import clTern from 'common/clTern';
import Button from 'features/geometry/controls/Button';
import React from 'react';

const GridControls = ({
  toggleGrid,
  gridStepUp,
  gridStepDown,
  isGrid,
  gridStep
}) => {
  const size = () => {
    if (gridStep <= 25) {
      return 's';
    } else if (gridStep === 50) {
      return 'm';
    } else {
      return 'l';
    }
  };
  return (
    <div className='grid-controls'>
      <Button handleClick={() => gridStepUp()} type='up' mod='s shadow hov' />
      <Button
        handleClick={() => toggleGrid()}
        type={`grid-${size()}`}
        mod={`s shadow ${clTern(isGrid, 'selected')}`}
      />
      <Button
        handleClick={() => gridStepDown()}
        type='down'
        mod='s shadow hov'
      />
    </div>
  );
};

export default GridControls;
