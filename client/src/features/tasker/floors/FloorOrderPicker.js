import React from 'react';

const FloorOrderPicker = ({ positionState, setPositionState, maxPosition }) => {
  const positionDown = () => {
    if (positionState < maxPosition) {
      setPositionState(positionState + 1);
    }
  };
  const positionUp = () => {
    if (positionState > 1) {
      setPositionState(positionState - 1);
    }
  };
  return (
    <div className='floor-position-picker'>
      <button className='up' onClick={() => positionUp()}>
        <span></span>
      </button>
      <h3>{positionState}</h3>
      <button className='down' onClick={() => positionDown()}>
        <span></span>
      </button>
    </div>
  );
};

export default FloorOrderPicker;
