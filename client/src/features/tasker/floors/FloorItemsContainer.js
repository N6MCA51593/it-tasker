import React from 'react';
import { selectAllFloors } from 'app/selectors';
import { addFloor } from 'features/tasker/floors/floorSlice';
import { useSelector, useDispatch } from 'react-redux';

const FloorItemsContainer = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectAllFloors);

  return (
    <div className='tasker-items-container'>
      <button onClick={() => dispatch(addFloor())}>Add</button>
    </div>
  );
};

export default FloorItemsContainer;
