import React from 'react';
import { selectFloorById } from 'app/selectors';
import { useSelector } from 'react-redux';
import DeviceGroup from 'features/tasker/single-page-item/DeviceGroup';

const FloorRow = ({ id, items }) => {
  const { name } = useSelector(state => selectFloorById(state, id));
  const areasDeduped = [...new Set(items.map(device => device.area))];

  return (
    <div className='tasker-floor-row'>
      <span>{name}</span>
      <div className='tasker-floor-row-items'>
        {areasDeduped.map(area => (
          <DeviceGroup
            key={area}
            areaId={area}
            devices={items.filter(device => device.area === area)}
          />
        ))}
      </div>
    </div>
  );
};

export default FloorRow;
