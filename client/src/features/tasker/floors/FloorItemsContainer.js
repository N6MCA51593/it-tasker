import React, { useEffect, useRef } from 'react';
import { selectAllFloorsSorted } from 'app/selectors';
import { addFloor } from 'features/tasker/floors/floorSlice';
import { useSelector, useDispatch } from 'react-redux';
import FloorListItem from 'features/tasker/floors/FloorListItem';
import FloorListItemEditing from 'features/tasker/floors/FloorListItemEditing';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

const FloorItemsContainer = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectAllFloorsSorted);
  const editingFloor = useSelector(state => state.floors.editingFloor);
  const ref = useRef();

  useEffect(() => {
    if (editingFloor && ref) {
      scrollIntoView(ref.current, {
        scrollMode: 'if-needed',
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [ref, editingFloor]);

  return (
    <div className='tasker-items-container'>
      <button
        onClick={() => dispatch(addFloor())}
        className='add-tasker-item-button'
      >
        +
      </button>
      {ids.map(id =>
        id === editingFloor ? (
          <FloorListItemEditing
            key={id}
            id={id}
            scrollToElem={() => <span ref={ref}></span>}
          />
        ) : (
          <FloorListItem key={id} id={id} />
        )
      )}
    </div>
  );
};

export default FloorItemsContainer;
