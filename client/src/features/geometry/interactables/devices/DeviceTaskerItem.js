import React from 'react';

const DeviceTaskerItem = ({ taskerItem }) => {
  const { name } = taskerItem;
  return (
    <div className='device-tasker-item'>
      {name}
      <span>{'>>'}</span>
    </div>
  );
};

export default DeviceTaskerItem;
