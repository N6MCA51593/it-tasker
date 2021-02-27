import React from 'react';
import { selectFloorById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import useConfirmationPopUp from 'common/useConfirmationPopUp'; //TODO Rewrite with render props
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
    <div className='collection-table-item tasker-floor-item'>
      <div>
        <h2 className='tasker-item-text'>{name}</h2>
        <div className='tasker-item-description'>{shortName}</div>
      </div>
      <div className='floor-list-item-controls'>
        <button
          className='btn s edit'
          onClick={() => dispatch(setEditingFloor(id))}
        >
          <span></span>
        </button>
        <button className='btn s delete' onClick={() => togglePopUp()}>
          <span></span>
        </button>
      </div>
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
