import { NOTE_TT, TASK_TT } from 'app/constants';
import clTern from 'common/clTern';
import React from 'react';

const TaskerContainerControls = ({
  activeTaskerItemType,
  setActiveTaskerItemType
}) => {
  return (
    <div className={`controls active-${activeTaskerItemType}`}>
      <div
        onClick={() => setActiveTaskerItemType(TASK_TT)}
        className={clTern(activeTaskerItemType === TASK_TT, 'active')}
      >
        Pending tasks
      </div>
      <div
        onClick={() => setActiveTaskerItemType(NOTE_TT)}
        className={clTern(activeTaskerItemType === NOTE_TT, 'active')}
      >
        Active notes
      </div>
    </div>
  );
};

export default TaskerContainerControls;
