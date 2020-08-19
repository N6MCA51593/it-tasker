import React, { useRef, useState, Fragment, useEffect } from 'react';
//import Layout from './Layout';
import Wall from './Wall';
import useZoom from './useZoom';
import usePan from './usePan';
//import Room from './Room';

const GeometryDrawing = () => {
  const [walls, setWalls] = useState([]);
  const [activeWall, setActiveWall] = useState(null);
  const [mode, setMode] = useState('draw');
  const [parentDimensions, setParentDimensions] = useState(null);

  const { zoomLvl, zoomIn, zoomOut } = useZoom();
  const { panH, panV, panHLvl, panVLvl } = usePan();

  const ref = useRef();

  useEffect(() => {
    setParentDimensions(ref.current.getBoundingClientRect());
  }, []);

  const getRelCoord = e => {
    const boundingRect = ref.current.getBoundingClientRect();
    return {
      x: Math.round((e.clientX - boundingRect.left) * zoomLvl + panHLvl),
      y: Math.round((e.clientY - boundingRect.top) * zoomLvl + panVLvl)
    };
  };

  const handleClick = e => {
    if (mode === 'draw') {
      if (activeWall) {
        setWalls([...walls, activeWall]);
      }

      setActiveWall({
        x1: getRelCoord(e).x,
        y1: getRelCoord(e).y,
        x2: getRelCoord(e).x,
        y2: getRelCoord(e).y
      });
    }
  };

  const handleMouseMove = e => {
    if (mode === 'draw' && activeWall) {
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
          viewBox={`${panHLvl} ${panVLvl} ${
            parentDimensions?.width * zoomLvl
          } ${parentDimensions?.height * zoomLvl}`}
        >
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
