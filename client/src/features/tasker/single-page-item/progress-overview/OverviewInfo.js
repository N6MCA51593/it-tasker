import React from 'react';

const OverviewInfo = ({ checkedOff, active }) => {
  return (
    <div className='overview-info'>
      <div>
        <span>Checked Off</span>
        <span>{checkedOff}</span>
      </div>
      <div>
        <span>Total</span>
        <span>{checkedOff + active}</span>
      </div>
      <div>
        <span>Progress</span>
        <span>
          {`${Math.floor((checkedOff / (checkedOff + active)) * 100)}%`}
        </span>
      </div>
    </div>
  );
};

export default OverviewInfo;
