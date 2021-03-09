import { TASK_TT } from 'app/constants';
import { selectTaskerItemById } from 'app/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

const DeviceTaskerItem = ({ id, toggleActive, checkOff }) => {
  const { name, type } = useSelector(state => selectTaskerItemById(state, id));
  return (
    <div className={`device-tasker-item ${type}`}>
      <span>{name}</span>
      <div className='device-item-controls'>
        {type === TASK_TT && (
          <button className='checkoff' onClick={checkOff}>
            <span></span>
          </button>
        )}
        <button className='open' onClick={toggleActive}>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default DeviceTaskerItem;
