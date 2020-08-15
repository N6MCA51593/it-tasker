import React, { useRef, useState } from 'react';
import Layout from './Layout';
import Wall from './Wall';

const GeometryDrawing = () => {
  const [points, setPoints] = useState([]);
  const [currPos, setCurrPos] = useState(null);
  const ref = useRef();

  const getRelCoord = e => {
    const boundingRect = ref.current.getBoundingClientRect();
    return {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    };
  };

  const handleClick = e => {
    setPoints([...points, getRelCoord(e)]);
  };

  const handleMouseMove = e => {
    setCurrPos(getRelCoord(e));
  };

  return (
    <div>
      <div
        ref={ref}
        onClick={e => handleClick(e)}
        onMouseMove={e => handleMouseMove(e)}
        className='draw-area'
      ></div>
      <svg>
        {points.map((e, i) => (
          <Wall key={i} coords={e} currPos={currPos} />
        ))}
      </svg>
    </div>
  );
};

export default GeometryDrawing;
