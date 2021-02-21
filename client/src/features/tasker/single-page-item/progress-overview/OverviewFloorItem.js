import React from 'react';

const OverviewFloorItem = ({ name, shortName, active, checkedOff }) => {
  const progress =
    typeof active === 'undefined'
      ? -1
      : Math.floor((checkedOff / (checkedOff + active)) * 100);

  return (
    <div className={`floor-item ${getColorClassName(progress)}`}>
      {shortName ? shortName : name}
    </div>
  );
};

export default OverviewFloorItem;

const getColorClassName = p => {
  const base = 'progress-';
  if (p === 0) {
    return base + 'new';
  } else if (p > 0 && p <= 25) {
    return base + 'low';
  } else if (p > 25 && p <= 50) {
    return base + 'low-mid';
  } else if (p > 50 && p <= 75) {
    return base + 'high-mid';
  } else if (p > 75 && p < 100) {
    return base + 'high';
  } else if (p === 100) {
    return base + 'complete';
  } else {
    return base + 'null';
  }
};
