import { selectAllFloorItemsSorted } from 'app/selectors';
import clTern from 'common/clTern';
import { setActiveFloor } from 'features/tasker/floors/floorSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FloorList = ({ activeFloor }) => {
  const floors = useSelector(selectAllFloorItemsSorted);
  const dispatch = useDispatch();
  return (
    <div className='controls-floor-list'>
      {floors.map(floor => (
        <div
          className={clTern(activeFloor === floor.id, 'active')}
          key={floor.id}
          onClick={() => dispatch(setActiveFloor(floor.id))}
        >
          {floor.shortName ? floor.shortName : floor.name}
        </div>
      ))}
    </div>
  );
};

export default FloorList;
