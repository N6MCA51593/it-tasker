import React from 'react';

const DeviceTaskerItem = ({ taskerItem, clickHandler }) => {
  const { name } = taskerItem;
  return (
    <div className='device-tasker-item' onClick={clickHandler}>
      {name}
      <span>{'>>'}</span>
    </div>
  );
};

export default DeviceTaskerItem;
