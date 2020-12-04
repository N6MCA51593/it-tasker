import React from 'react';
import { selectAllFloorsSorted } from 'app/selectors';
import { addFloor } from 'features/tasker/floors/floorSlice';
import { useSelector, useDispatch } from 'react-redux';
import FloorListItem from 'features/tasker/floors/FloorListItem';
import FloorListItemEditing from 'features/tasker/floors/FloorListItemEditing';

const FloorItemsContainer = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectAllFloorsSorted);
  const editingFloor = useSelector(state => state.floors.editingFloor);

  return (
    <div className='tasker-items-container'>
      {ids.map(id =>
        id === editingFloor ? (
          <FloorListItemEditing key={id} id={id} />
        ) : (
          <FloorListItem key={id} id={id} />
        )
      )}
      <button onClick={() => dispatch(addFloor())}>Add</button>
    </div>
  );
};

export default FloorItemsContainer;
