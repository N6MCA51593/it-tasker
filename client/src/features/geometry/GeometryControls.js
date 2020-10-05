import React from 'react';
import { cancelDrawing } from 'features/geometry/wallSlice';
import { useDispatch } from 'react-redux';

const GeometryControls = ({
  zoomIn,
  zoomOut,
  panH,
  panV,
  setMode,
  toggleGrid,
  gridStepUp,
  gridStepDown
}) => {
  const dispatch = useDispatch();
  return (
    <div className='geometry-controls'>
      <button onClick={() => setMode('nav')}>Nav</button>
      <button onClick={() => setMode('draw')}>Draw</button>
      <button onClick={() => dispatch(cancelDrawing())}>Cancel</button>
      <button onClick={() => setMode('remove')}>Remove</button>
      <button onClick={() => setMode('move')}>Move</button>
      <button onClick={() => toggleGrid()}>Grid</button>
      <button onClick={() => gridStepUp()}>^</button>
      <button onClick={() => gridStepDown()}>⌄</button>
      <button onClick={() => zoomIn()}> + </button>
      <button onClick={() => zoomOut()}> - </button>
      <button onClick={() => panV(-1)}> T </button>
      <button onClick={() => panV()}> B </button>
      <button onClick={() => panH(-1)}> L </button>
      <button onClick={() => panH()}> R </button>
    </div>
  );
};

export default GeometryControls;
