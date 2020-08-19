import React, { useRef, useState, Fragment } from 'react';
//import Layout from './Layout';
import Wall from './Wall';
import useZoom from './useZoom';
//import Room from './Room';

const GeometryDrawing = () => {
  const [walls, setWalls] = useState([]);
  const [activeWall, setActiveWall] = useState(null);
  const [mode, setMode] = useState('draw');
  const [zoomLvl, setZoomLvl] = useState(1);
  const [panVLvl, setPanVLvl] = useState(0);
  const [panHLvl, setPanHLvl] = useState(0);
  const ref = useRef();

  const getRelCoord = e => {
    const boundingRect = ref.current.getBoundingClientRect();
    return {
      x: Math.round((e.clientX - boundingRect.left + panHLvl) * zoomLvl),
      y: Math.round((e.clientY - boundingRect.top + panVLvl) * zoomLvl)
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

  const zoom = lvl => {
    setZoomLvl(zoomLvl * lvl);
  };
  const panV = lvl => {
    setPanVLvl(panVLvl + lvl);
  };
  const panH = lvl => {
    setPanHLvl(panHLvl - lvl);
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
          viewBox={`${panHLvl} ${panVLvl} ${400 * zoomLvl} ${400 * zoomLvl}`}
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
      <button onClick={() => zoom(1 / 1.5)}> + </button>
      <button onClick={() => zoom(1.5)}> - </button>
      <button onClick={() => panV(-45)}> T </button>
      <button onClick={() => panV(45)}> B </button>
      <button onClick={() => panH(45)}> L </button>
      <button onClick={() => panH(-45)}> R </button>
    </Fragment>
  );
};

export default GeometryDrawing;
