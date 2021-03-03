import { selectTaskerItemById } from 'app/selectors';
import CollapsibleText from 'common/CollapsibleText';
import React from 'react';
import { useSelector } from 'react-redux';

const TaskerItemText = ({ id }) => {
  const { name, description } = useSelector(state =>
    selectTaskerItemById(state, id)
  );

  return (
    <div className='tasker-item-text'>
      <h2>{name}</h2>
      <CollapsibleText text={description} />
    </div>
  );
};

export default TaskerItemText;
