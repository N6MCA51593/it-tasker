import React from 'react';
import { useSelector } from 'react-redux';
import {
  getTaskerProgressOverview,
  selectAllFloorItemsSorted
} from 'app/selectors';
import OverviewFloorItem from 'features/tasker/single-page-item/progress-overview/OverviewFloorItem';

const ProgressOverview = ({ id }) => {
  const progressTable = useSelector(getTaskerProgressOverview);
  const floors = useSelector(selectAllFloorItemsSorted);
  if (!progressTable) {
    return null;
  }

  return (
    <div className='section'>
      <div className='tasker-progress-overview'>
        <div className='floor-overview'>
          {floors.map(floor => {
            const { id, name, shortName } = floor;
            return (
              <OverviewFloorItem
                key={id}
                name={name}
                shortName={shortName}
                active={progressTable[id]?.active}
                checkedOff={progressTable[id]?.checkedOff}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
