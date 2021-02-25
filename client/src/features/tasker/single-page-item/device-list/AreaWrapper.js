import clTern from 'common/clTern';
import React from 'react';

const AreaWrapper = ({
  devices,
  index,
  children,
  areaClickHandler,
  isHovering,
  setIsHovering,
  name,
  isEditing,
  isCheckedOff
}) => {
  const className = `device-group ${clTern(index === 0, 'first ')}${clTern(
    index === devices.length - 1,
    'last '
  )}${clTern(isHovering, 'hov ')}${clTern(isCheckedOff, 'checked-off')}`;
  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => areaClickHandler()}
    >
      {index === 0 && <span>{name}</span>}
      {children}
    </div>
  );
};

export default AreaWrapper;
