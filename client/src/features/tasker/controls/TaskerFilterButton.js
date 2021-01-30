import clTern from 'common/clTern';
import React from 'react';

const TaskerFilterButton = ({ handleClick, isActive, text }) => {
  return (
    <button
      className={`tasker-filter-button ${clTern(isActive, 'active')}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default TaskerFilterButton;
