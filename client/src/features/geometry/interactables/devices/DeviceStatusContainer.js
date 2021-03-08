import { FAILURE_DS, OK_DS, WARNING_DS } from 'app/constants';
import DeviceStatusIndicator from 'features/geometry/interactables/devices/DeviceStatusIndicator';
import React from 'react';

const DeviceStatusContainer = ({ id }) => {
  return (
    <div className='status-container'>
      <DeviceStatusIndicator id={id} status={OK_DS} />
      <DeviceStatusIndicator id={id} status={WARNING_DS} />
      <DeviceStatusIndicator id={id} status={FAILURE_DS} />
    </div>
  );
};

export default DeviceStatusContainer;
