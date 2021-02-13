import { setTaskerContainerMobile } from 'app/uiStateSlice';
import clTern from 'common/clTern';
import Button from 'features/geometry/controls/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TaskerContainerPositionControls = () => {
  const dispatch = useDispatch();
  const isTaskerContainerVisibleMobile = useSelector(
    state => state.uiState.isTaskerContainerVisibleMobile
  );
  return (
    <div
      className={`tasker-container-visibility-controls ${clTern(
        isTaskerContainerVisibleMobile,
        'active'
      )}`}
    >
      <Button
        handleClick={() => dispatch(setTaskerContainerMobile())}
        type={isTaskerContainerVisibleMobile ? 'right' : 'list'}
        mod={`s shadow ${isTaskerContainerVisibleMobile ? 'selected' : 'hov'}`}
      />
    </div>
  );
};

export default TaskerContainerPositionControls;
