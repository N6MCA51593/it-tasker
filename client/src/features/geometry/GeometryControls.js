import React from 'react';

const GeometryControls = ({
  zoomIn,
  zoomOut,
  panH,
  panV,
  setMode,
  toggleGrid
}) => {
  return (
    <div className='geometry-controls'>
      <button onClick={() => setMode('nav')}>Nav</button>
      <button onClick={() => setMode('draw')}>Draw</button>
      <button onClick={() => setMode('remove')}>Remove</button>
      <button onClick={() => setMode('move')}>Move</button>
      <button onClick={() => toggleGrid()}>Grid</button>
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
