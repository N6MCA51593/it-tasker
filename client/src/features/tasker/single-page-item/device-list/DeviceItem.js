import {
  selectDeviceActiveItemStatus,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { TASK_TT } from 'app/constants';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const DeviceItem = ({ name, clickHandler, id, setIsHovering }) => {
  const { isEditing, activeItemType } = useSelector(
    selectTaskerActiveItemProperties,
    shallowEqual
  );
  const isCheckedOff = useSelector(state =>
    selectDeviceActiveItemStatus(state, id)
  );
  const isCheckedOffAble = activeItemType === TASK_TT;

  const baseClassName = 'device-item';
  const checkOffableClassName = `${
    isCheckedOffAble ? 'checkoffable' : 'noncheckoffable'
  }`;
  const checkedOffClassName = `${
    isCheckedOffAble && isCheckedOff ? 'notcheckedoff' : 'checkedoff'
  }`;
  const className = isEditing
    ? `${baseClassName} edit`
    : `${baseClassName} ${checkOffableClassName} ${checkedOffClassName}`;

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
