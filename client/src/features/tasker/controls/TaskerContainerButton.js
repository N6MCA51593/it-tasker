import clTern from 'common/clTern';
import React from 'react';

const TaskerContainerButton = ({ handleClick, isActive, text, type }) => {
  return (
    <button
      className={`tasker-container-${type}-button ${clTern(
        isActive,
        'active'
      )}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default TaskerContainerButton;
