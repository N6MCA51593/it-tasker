import React, { memo } from 'react';
import { selectFloorById, selectSortedAreasAndDevices } from 'app/selectors';
import { useSelector } from 'react-redux';
import DeviceGroup from 'features/tasker/single-page-item/DeviceGroup';

const FloorRow = ({ id }) => {
  const { name } = useSelector(state => selectFloorById(state, id));
  const { areas, devicesByArea } = useSelector(selectSortedAreasAndDevices);

  return (
    <div className='tasker-floor-row'>
      <span>{name}</span>
      <div className='tasker-floor-row-items'>
        {areas.map(area => (
          <DeviceGroup
            key={area}
            areaId={area}
            deviceIds={devicesByArea[area]}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(FloorRow);
