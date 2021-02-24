import React from 'react';

const OverviewInfo = ({ checkedOff, active }) => {
  return (
    <div className='overview-info'>
      <div>
        <span>CHECKED OFF</span>
        <span>{checkedOff}</span>
      </div>
      <div>
        <span>TOTAL</span>
        <span>{checkedOff + active}</span>
      </div>
      <div>
        <span>PROGRESS</span>
        <span>
          {`${Math.floor((checkedOff / (checkedOff + active)) * 100)}%`}
        </span>
      </div>
    </div>
  );
};

export default OverviewInfo;
