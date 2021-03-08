import { selectTaskerItemById } from 'app/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

const DeviceTaskerItem = ({ id, clickHandler }) => {
  const { name } = useSelector(state => selectTaskerItemById(state, id));
  return (
    <div className='device-tasker-item' onClick={clickHandler}>
      {name}
      <span>{'>>'}</span>
    </div>
  );
};

export default DeviceTaskerItem;
