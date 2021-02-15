import { selectAllFloorItemsSorted } from 'app/selectors';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

const FloorDisplay = ({ activeFloor, handleClick }) => {
  const refArr = useRef([]);
  const floors = useSelector(selectAllFloorItemsSorted);

  useEffect(() => {
    refArr.current = refArr.current.slice(0, floors.length);
  }, [floors]);

  useEffect(() => {
    const ref =
      refArr.current[floors.findIndex(floor => floor.id === activeFloor)];
    if (ref) {
      scrollIntoView(ref, {
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [activeFloor, floors]);

  return (
    <div className='floor-display' onClick={handleClick}>
      <div className='reel'>
        {[...floors].reverse().map((floor, i) => (
          <div
            key={floor.id}
            ref={el => (refArr.current[floors.length - 1 - i] = el)}
          >
            {floor.shortName ? floor.shortName : floor.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorDisplay;
