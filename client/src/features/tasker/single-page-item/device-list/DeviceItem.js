import { selectDeviceActiveItemStatus } from 'app/selectors';

import React from 'react';
import { useSelector } from 'react-redux';

const DeviceItem = ({ name, clickHandler, id, setIsHovering, isEditing }) => {
  const isCheckedOff = useSelector(state =>
    selectDeviceActiveItemStatus(state, id)
  );

  const baseClassName = 'device-item';

  const checkedOffClassName = `${
    isCheckedOff ? 'checkedoff' : 'notcheckedoff'
  }`;
  const className = isEditing
    ? `${baseClassName} edit`
    : `${baseClassName} ${checkedOffClassName}`;

  return (
    <div
      className={className}
      onClick={clickHandler}
      onMouseEnter={() => setIsHovering(false)}
      onMouseLeave={() => setIsHovering(true)}
    >
      {name}
    </div>
  );
};

export default DeviceItem;
