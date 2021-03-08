import { selectDeviceById } from 'app/selectors';
import { setDeviceStatus } from 'features/api/setDeviceStatus';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeviceStatusIndicator = ({ id, status }) => {
  const dispatch = useDispatch();
  const { status: deviceStatus } = useSelector(state =>
    selectDeviceById(state, id)
  );
  const isActive = status === deviceStatus;

  const handleClick = () => {
    if (!isActive) {
      dispatch(setDeviceStatus({ status, id }));
    }
  };

  return (
    <div
      className={`device-status-indicator ${status} ${
        isActive ? 'active' : 'inactive'
      }`}
      onClick={handleClick}
    ></div>
  );
};

export default DeviceStatusIndicator;
