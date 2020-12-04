import React from 'react';
import { selectFloorById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import useConfirmationPopUp from 'common/useConfirmationPopUp';
import ConfirmationPopUp from 'common/ConfirmationPopUp';
import { setEditingFloor } from 'features/tasker/floors/floorSlice';
import { removeFloor } from 'features/api/removeFloor';

const FloorListItem = ({ id }) => {
  const dispatch = useDispatch();
  const floor = useSelector(state => selectFloorById(state, id));
  const { name, shortName } = floor;
  const { isShowing, togglePopUp } = useConfirmationPopUp();

  const handleConfirmation = () => {
    dispatch(removeFloor(id));
  };

  return (
    <div className='collection-table-item'>
      {name}
      {shortName}
      <button onClick={() => dispatch(setEditingFloor(id))}>Edit</button>
      <button onClick={() => togglePopUp()}>Delete</button>
      {isShowing && (
        <ConfirmationPopUp
          togglePopUp={togglePopUp}
          handleConfirmation={handleConfirmation}
        />
      )}
    </div>
  );
};

export default FloorListItem;
