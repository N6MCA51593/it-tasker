import React from 'react';
import { useSelector } from 'react-redux';
import { selectDeviceById } from 'app/selectors';
import CollapsibleText from 'common/CollapsibleText';
import DeviceStatusContainer from 'features/geometry/interactables/devices/DeviceStatusContainer';
import DeviceTaskerItemsContainer from 'features/geometry/interactables/devices/DeviceTaskerItemsContainer';

const DeviceMainPopUp = ({ id, floor }) => {
  const { name, description } = useSelector(state =>
    selectDeviceById(state, id)
  );
  return (
    <div className='container'>
      <div>
        <h3>{name}</h3>
        <DeviceStatusContainer id={id} />
      </div>
      <div className='description'>
        <CollapsibleText text={description} id={id} />
      </div>
      <DeviceTaskerItemsContainer id={id} floor={floor} />
    </div>
  );
};

export default DeviceMainPopUp;
