import React, { memo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFloor } from 'features/tasker/floors/floorSlice';
import { selectActiveFloor, selectAllFloorsSorted } from 'app/selectors';
import Button from 'features/geometry/controls/Button';
import FloorDisplay from 'features/geometry/controls/FloorDisplay';
import FloorList from 'features/geometry/controls/FloorList';
import useOnClickOutside from 'common/useOnClickOutside';

const FloorSwitcher = () => {
  const dispatch = useDispatch();
  const floors = useSelector(selectAllFloorsSorted);
  const activeFloor = useSelector(selectActiveFloor);
  const [isShowing, setIsShowing] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsShowing(false));
  const pickFloor = dir => {
    const l = floors.length;
    const pos = floors.indexOf(activeFloor);
    if (dir === 1) {
      if (pos === l - 1) {
        return floors[0];
      } else {
        return floors[pos + 1];
      }
    } else if (dir === -1) {
      if (pos === 0) {
        return floors[l - 1];
      } else {
        return floors[pos - 1];
      }
    }
  };
  return (
    <div className='floor-controls' ref={ref}>
      <Button
        type='down'
        mod='shadow hov'
        handleClick={() => dispatch(setActiveFloor(pickFloor(-1)))}
      />
      {isShowing && <FloorList activeFloor={activeFloor} />}
      <FloorDisplay
        pickFloor={pickFloor}
        activeFloor={activeFloor}
        handleClick={() => setIsShowing(!isShowing)}
      />
      <Button
        type='up'
        mod='shadow hov'
        handleClick={() => dispatch(setActiveFloor(pickFloor(1)))}
      />
    </div>
  );
};

export default memo(FloorSwitcher);
