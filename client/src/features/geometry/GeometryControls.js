import React, { useEffect } from 'react';
import { cancelDrawing } from 'features/geometry/walls/wallSlice';
import { saveArea } from 'features/geometry/areas/areaSlice';
import { setUiState } from 'app/uiStateSlice';
import { useDispatch } from 'react-redux';

const GeometryControls = ({
  zoomIn,
  zoomOut,
  panH,
  panV,
  setMode,
  toggleGrid,
  gridStepUp,
  gridStepDown,
  uiState
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (uiState === 'main') {
      setMode('nav');
    }
  }, [uiState, setMode]);

  return (
    <div className='geometry-controls'>
      {uiState === 'edit-areas' && (
        <div className='device-controls'>
          <button onClick={() => setMode('add-device')}>Add</button>
          <button onClick={() => setMode('remove-device')}>Remove</button>
          <button onClick={() => setMode('move-device')}>Move</button>
        </div>
      )}
      {uiState === 'edit-areas' && (
        <div className='area-controls'>
          <button onClick={() => setMode('nav')}>Nav</button>
          <button onClick={() => setMode('draw')}>Draw</button>
          <button onClick={() => setMode('remove')}>Remove</button>
          <button onClick={() => setMode('redraw')}>Redraw</button>
          <button onClick={() => dispatch(saveArea())}>Save Area</button>
          <button onClick={() => setMode('label-move')}>Move Label</button>
          <button onClick={() => setMode('label-rename')}>Rename Label</button>
        </div>
      )}
      {uiState === 'edit-geometry' && (
        <div className='wall-controls'>
          <button onClick={() => setMode('nav')}>Nav</button>
          <button onClick={() => setMode('draw')}>Draw</button>
          <button onClick={() => setMode('remove')}>Remove</button>
          <button onClick={() => setMode('move')}>Move</button>
          <button onClick={() => dispatch(cancelDrawing())}>Cancel</button>
        </div>
      )}
      <div className='nav-controls'>
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
      <div className='state-nav-controls'>
        <button onClick={() => dispatch(setUiState('main'))}>Main</button>
        <button onClick={() => dispatch(setUiState('edit-geometry'))}>
          Geom
        </button>
        <button onClick={() => dispatch(setUiState('edit-areas'))}>
          Areas/Dev
        </button>
      </div>
    </div>
  );
};

export default GeometryControls;
