import {
  selectAreaById,
  selectDevicesById,
  selectIsAreaCheckedOff,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { TASK_TT } from 'app/constants';
import { checkOffDevices } from 'features/api/checkOffDevices';
import DeviceItem from 'features/tasker/single-page-item/device-list/DeviceItem';
import { toggleDevice } from 'features/tasker/taskerSlice';
import useAreaTaskerState from 'features/tasker/single-page-item/device-list/useAreaTaskerState';
import React, { Fragment, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AreaWrapper from 'features/tasker/single-page-item/device-list/AreaWrapper';

const DeviceGroup = ({ areaId, deviceIds }) => {
  const [isHovering, setIsHovering] = useState(false);
  const devices = useSelector(state => selectDevicesById(state, deviceIds));
  const dispatch = useDispatch();
  const { name, floor } = useSelector(state => selectAreaById(state, areaId));
  const { removeChildren } = useAreaTaskerState(areaId, floor);
  const { isEditing, activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );
  const isCheckedOff = useSelector(state =>
    selectIsAreaCheckedOff(state, devices)
  );

  const deviceClickHandler = (id, floor, e) => {
    e.stopPropagation();
    if (isEditing) {
      dispatch(toggleDevice({ id, floor }));
    } else if (activeItemType === TASK_TT) {
      dispatch(checkOffDevices({ toCheckOff: id }));
    }
  };

  const areaClickHandler = () => {
    if (isEditing) {
      removeChildren(devices);
    } else if (activeItemType === TASK_TT) {
      dispatch(
        checkOffDevices({ toCheckOff: devices.map(device => device.id) })
      );
    }
  };

  return (
    <Fragment>
      {devices.map((device, i) => (
        <AreaWrapper
          devices={devices}
          index={i}
          key={device.id}
          areaClickHandler={areaClickHandler}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
          name={name}
          isEditing={isEditing}
          isCheckedOff={isCheckedOff}
        >
          <DeviceItem
            key={device.id}
            name={device.name}
            id={device.id}
            clickHandler={e => deviceClickHandler(device.id, device.floor, e)}
            setIsHovering={setIsHovering}
          />
        </AreaWrapper>
      ))}
    </Fragment>
  );
};

export default DeviceGroup;
