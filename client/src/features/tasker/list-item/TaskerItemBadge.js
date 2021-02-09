import { COLLECTION_TT, NOTE_TT, TASK_TT } from 'app/constants';
import React from 'react';

const TaskerItemBadge = ({ type }) => {
  const badgeTable = {
    [TASK_TT]: 'Task',
    [NOTE_TT]: 'Note',
    [COLLECTION_TT]: 'Collection',
    'comp-low': 'Opened',
    'comp-mid': 'In progress',
    'comp-high': 'Completed',
    'comp-completed': 'Completed (Checked Off)'
  };
  return <div className={`tasker-item-badge ${type}`}>{badgeTable[type]}</div>;
};

export default TaskerItemBadge;
