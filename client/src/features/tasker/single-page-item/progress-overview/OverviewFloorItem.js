import React from 'react';

const OverviewFloorItem = ({ name, shortName, active, checkedOff }) => {
  const progress =
    typeof active === 'undefined'
      ? -1
      : Math.floor((checkedOff / (checkedOff + active)) * 100);
  //console.log(progress);
  const classTable = {};
  return <div className={`floor-item `}>{shortName ? shortName : name}</div>;
};

export default OverviewFloorItem;
