import React from 'react';
import { selectFloorById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setEditingFloor } from 'features/tasker/floors/floorSlice';
import { removeFloor } from 'features/api/removeFloor';
import ConfirmationPopupComponent from 'common/ConfirmationPopupComponent';

const FloorListItem = ({ id }) => {
  const dispatch = useDispatch();
  const floor = useSelector(state => selectFloorById(state, id));
  const { name, shortName } = floor;

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
        <ConfirmationPopupComponent
          opener={handeClick => (
            <button className='btn s delete' onClick={handeClick}>
              <span></span>
            </button>
          )}
          title={() => (
            <h3 className='confirmation-title'>
              Are you sure you want to delete this item?
            </h3>
          )}
          action={() => (
            <button
              className='but-del'
              onClick={() => dispatch(handleConfirmation)}
            >
              Delete
            </button>
          )}
          cancel={handleClick => (
            <button className='but-cancel' onClick={handleClick}>
              Cancel
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default FloorListItem;
