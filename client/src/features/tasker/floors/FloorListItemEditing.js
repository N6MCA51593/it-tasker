import React, { useState } from 'react';
import { selectFloorById, selectMaxPosition } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import useInput from 'common/useInput';
import { updateFloor } from 'features/api/updateFloor';
import { setEditingFloor } from 'features/tasker/floors/floorSlice';
import FloorOrderPicker from 'features/tasker/floors/FloorOrderPicker';

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

  return (
    <div className='floor-edit'>
      <div>
        {scrollToElem()}
        <label>
          Name:
          <input {...bindName} />
        </label>
        <label>
          Short name (4 symbols max):
          <input {...bindShortNameState} maxLength='4' />
        </label>

        <div className='floor-list-item-controls'>
          <button
            className='btn primary tasker-edit'
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
            <span></span>Save
          </button>
          <button
            className='button-secondary'
            onClick={() => dispatch(setEditingFloor())}
          >
            Cancel
          </button>
        </div>
      </div>
      <FloorOrderPicker
        positionState={positionState}
        setPositionState={setPositionState}
        maxPosition={maxPosition}
      />
    </div>
  );
};

export default FloorListItemEditing;
