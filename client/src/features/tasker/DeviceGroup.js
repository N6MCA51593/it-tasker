import {
  selectAreaById,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { taskTT } from 'common/uiStates';
import DeviceItem from 'features/tasker/DeviceItem';
import {
  toggleDevice,
  toggleDeviceCheckOff
} from 'features/tasker/taskerSlice';
import useAreaTaskerState from 'features/tasker/useAreaTaskerState';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const DeviceGroup = ({ areaId, devices }) => {
  const dispatch = useDispatch();
  const { name, floor } = useSelector(state => selectAreaById(state, areaId));
  const { toggleChildren } = useAreaTaskerState(areaId, floor);
  const { isEditing, activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );

  const deviceClickHandler = (id, floor) => {
    if (isEditing) {
      dispatch(toggleDevice({ id, floor }));
    } else if (activeItemType === taskTT) {
      dispatch(toggleDeviceCheckOff(id));
    }
  };

  const areaClickHandler = () => {
    if (isEditing) {
      toggleChildren();
    } else if (activeItemType === taskTT) {
      dispatch(toggleDeviceCheckOff(devices.map(device => device.id)));
    }
  };

  return (
    <div>
      <div className='collection-row-items'>
        <div className='collection-row-item' onClick={() => areaClickHandler()}>
          {name}
        </div>
        {devices.map(device => (
          <DeviceItem
            key={device.id}
            name={device.name}
            id={device.id}
            clickHandler={() => deviceClickHandler(device.id, device.floor)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeviceGroup;
