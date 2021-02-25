import React, { memo, useMemo } from 'react';
import {
  selectFloorById,
  selectSortedFloorAreasAndDevices
} from 'app/selectors';
import { useSelector } from 'react-redux';
import DeviceGroup from 'features/tasker/single-page-item/device-list/DeviceGroup';

const FloorRow = ({ id }) => {
  const { name } = useSelector(state => selectFloorById(state, id));
  const interactablesSelector = useMemo(selectSortedFloorAreasAndDevices, []);
  const { areas, devicesByArea } = useSelector(state =>
    interactablesSelector(state, id)
  );

  return (
    <div className='tasker-floor-row'>
      <h3>{name}</h3>
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
