import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFloor } from 'features/tasker/floors/floorSlice';
import { selectActiveFloor, selectAllFloorsSorted } from 'app/selectors';
import Button from 'features/geometry/controls/Button';
import FloorDisplay from 'features/geometry/controls/FloorDisplay';

const FloorSwitcher = () => {
  const dispatch = useDispatch();
  const floors = useSelector(selectAllFloorsSorted);
  const activeFloor = useSelector(selectActiveFloor);
  const pickFloor = dir => {
    const l = floors.length;
    const pos = floors.indexOf(activeFloor);
    if (dir === -1) {
      if (pos === l - 1) {
        return floors[0];
      } else {
        return floors[pos + 1];
      }
    } else if (dir === 1) {
      if (pos === 0) {
        return floors[l - 1];
      } else {
        return floors[pos - 1];
      }
    }
  };
  return (
    <div className='floor-controls'>
      <Button
        type='up'
        mod='shadow hov'
        handleClick={() => dispatch(setActiveFloor(pickFloor(1)))}
      />
      <FloorDisplay pickFloor={pickFloor} activeFloor={activeFloor} />
      <Button
        type='down'
        mod='shadow hov'
        handleClick={() => dispatch(setActiveFloor(pickFloor(-1)))}
      />
    </div>
  );
};

export default memo(FloorSwitcher);
