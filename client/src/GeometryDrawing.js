import React, { useRef, useState, Fragment } from 'react';
//import Layout from './Layout';
import Wall from './Wall';
//import Room from './Room';

const GeometryDrawing = () => {
  const [walls, setWalls] = useState([]);
  const [activeWall, setActiveWall] = useState(null);
  const [mode, setMode] = useState('draw');
  const ref = useRef();

  const getRelCoord = e => {
    const boundingRect = ref.current.getBoundingClientRect();
    return {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
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
        <svg>
          {activeWall && <Wall {...activeWall} />}
          {walls.map((e, i) => (
            <Wall
              key={i}
              {...e}
              mode={mode}
              handleWallClick={handleWallClick}
            />
          ))}
        </svg>
      </div>
      <button onClick={() => setMode('draw')}>Draw on</button>
    </Fragment>
  );
};

export default GeometryDrawing;
