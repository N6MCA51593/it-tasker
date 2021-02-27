import React, { useState } from 'react';
import { selectFloorById, selectMaxPosition } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import useInput from 'common/useInput';
import { updateFloor } from 'features/api/updateFloor';
import { setEditingFloor } from 'features/tasker/floors/floorSlice';

const FloorListItemEditing = ({ id, scrollToElem }) => {
  const dispatch = useDispatch();
  const floor = useSelector(state => selectFloorById(state, id));
  const { name, shortName, position } = floor;
  const [positionState, setPositionState] = useState(position);
  const { value: nameState, bind: bindName } = useInput(name);
  const { value: shortNameState, bind: bindShortNameState } = useInput(
    shortName
  );
  const maxPosition = useSelector(selectMaxPosition);

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
      {scrollToElem()}
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
    </div>
  );
};

export default FloorListItemEditing;
