import React, { useState } from 'react';
import { selectFloorById, selectMaxPosition } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import useInput from 'common/useInput';
import useConfirmationPopUp from 'common/useConfirmationPopUp';
import ConfirmationPopUp from 'common/ConfirmationPopUp';
import { updateFloor } from 'features/api/updateFloor';
import { setEditingFloor } from 'features/tasker/floors/floorSlice';

const FloorListItem = ({ id }) => {
  const dispatch = useDispatch();
  const floor = useSelector(state => selectFloorById(state, id));
  const { name, shortName, position } = floor;
  const isEditing = useSelector(state => state.floors.editingFloor === id);
  const [positionState, setPositionState] = useState(position);
  const { value: nameState, bind: bindName } = useInput(name);
  const { value: shortNameState, bind: bindShortNameState } = useInput(
    shortName
  );
  const { isShowing, togglePopUp } = useConfirmationPopUp();
  const maxPosition = useSelector(selectMaxPosition);

  const handleConfirmation = () => {};

  if (isEditing) {
    const positionUp = () => {
      if (positionState < maxPosition) {
        setPositionState(positionState + 1);
      }
    };
    const positionDown = () => {
      if (positionState > 1) {
        setPositionState(positionState - 1);
      }
    };

    return (
      <div className='collection-table-item'>
        <label>
          Name:
          <input {...bindName} />
        </label>
        <label>
          Short name (4 symbols max):
          <input {...bindShortNameState} maxLength='4' />
        </label>
        {positionState}
        <button onClick={() => positionDown()}>-</button>
        <button onClick={() => positionUp()}>+</button>
        <button
          onClick={() =>
            dispatch(
              updateFloor({
                ...floor,
                oldPosition: position,
                position: positionState,
                name: nameState,
                shortName: shortNameState
              })
            )
          }
        >
          Save
        </button>
        <button onClick={() => dispatch(setEditingFloor())}>Cancel</button>
        {isShowing && (
          <ConfirmationPopUp
            togglePopUp={togglePopUp}
            handleConfirmation={handleConfirmation}
          />
        )}
      </div>
    );
  }

  return (
    <div className='collection-table-item'>
      {name}
      {shortName}
      <button onClick={() => dispatch(dispatch(setEditingFloor(id)))}>
        Edit
      </button>
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
