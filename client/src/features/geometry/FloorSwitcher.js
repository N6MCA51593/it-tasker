import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFloor } from 'features/geometry/floors/floorSlice';
import { selectAllFloorItems } from 'app/selectors';

const FloorSwitcher = () => {
  const dispatch = useDispatch();
  const floors = useSelector(selectAllFloorItems);
  return (
    <div className='floor-controls'>
      {floors &&
        floors.map(e => (
          <button key={e.id} onClick={() => dispatch(setActiveFloor(e.id))}>
            {e.name}
          </button>
        ))}
    </div>
  );
};

export default FloorSwitcher;
