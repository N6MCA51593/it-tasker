import React, { useRef, useState, Fragment } from 'react';
import Wall from './Wall';
import Grid from './Grid';
//import Test from './Test';
import useZoom from './useZoom';
import usePan from './usePan';
import useDimensions from './useDimensions';
import useCoordinates from './useCoordinates';

const GeometryDrawing = () => {
  const isGrid = true;
  const gridStep = 50;
  const [walls, setWalls] = useState([]);
  const [activeWall, setActiveWall] = useState(null);
  const [mode, setMode] = useState('draw');

  const ref = useRef();

  const { zoomLvl, zoomIn, zoomOut } = useZoom();
  const { panH, panV, panHLvl, panVLvl } = usePan(zoomLvl);
  const { width, height } = useDimensions(ref);
  const { getRelCoord } = useCoordinates({
    isGrid,
    gridStep,
    zoomLvl,
    panHLvl,
    panVLvl,
    ref
  });

  const handleClick = e => {
    if (mode === 'draw') {
      if (activeWall) {
        setWalls([
          ...walls,
          {
            x1: activeWall.x1,
            y1: activeWall.y1,
            x2: isGrid ? getRelCoord(e, true).x : activeWall.x2,
            y2: isGrid ? getRelCoord(e, true).y : activeWall.y2
          }
        ]);
      }

      const { x, y } = getRelCoord(e, true);
      setActiveWall({
        x1: x,
        y1: y,
        x2: x,
        y2: y
      });
    }
  };

  const handleMouseMove = e => {
    if (mode === 'draw' && activeWall) {
      //console.log(getRelCoord(e));
      setActiveWall({
        ...activeWall,
        x2: getRelCoord(e).x,
        y2: getRelCoord(e).y
      });
    }
  };

  const handleWallClick = (e, coords) => {
    e.stopPropagation();
    if (mode === 'draw') {
      if (!activeWall) {
        setActiveWall({
          x1: coords.x,
          y1: coords.y,
          x2: coords.x,
          y2: coords.y
        });
      } else {
        setWalls([...walls, { ...activeWall, x2: coords.x, y2: coords.y }]);
        setActiveWall(null);
        setMode(null);
      }
    }
  };

  return (
    <Fragment>
      <div
        ref={ref}
        onClick={e => handleClick(e)}
        onMouseMove={e => handleMouseMove(e)}
        className='draw-area'
      >
        <svg
          viewBox={`${panHLvl} ${panVLvl} ${width * zoomLvl} ${
            height * zoomLvl
          }`}
        >
          <Grid
            panVLvl={panVLvl}
            panHLvl={panHLvl}
            width={width * zoomLvl}
            height={height * zoomLvl}
          />
          {activeWall && <Wall {...activeWall} />}
          {walls.map((e, i) => (
            <Wall
              key={i}
              {...e}
              mode={mode}
              handleWallClick={handleWallClick}
              getRelCoord={getRelCoord}
            />
          ))}
        </svg>
      </div>
      <button onClick={() => setMode('draw')}>Draw on</button>
      <button onClick={() => zoomIn()}> + </button>
      <button onClick={() => zoomOut()}> - </button>
      <button onClick={() => panV(-1)}> T </button>
      <button onClick={() => panV()}> B </button>
      <button onClick={() => panH(-1)}> L </button>
      <button onClick={() => panH()}> R </button>
    </Fragment>
  );
};

export default GeometryDrawing;
