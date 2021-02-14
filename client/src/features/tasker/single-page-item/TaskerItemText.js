import { selectTaskerItemById } from 'app/selectors';
import clTern from 'common/clTern';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const TaskerItemText = ({ id }) => {
  const { name, description } = useSelector(state =>
    selectTaskerItemById(state, id)
  );
  const isLong = description.length > 260;
  const [isShowing, setIsShowing] = useState(!isLong);

  return (
    <div className='tasker-item-text'>
      <h2>{name}</h2>
      <div className={`description-container ${clTern(isShowing, 'full')}`}>
        <div className={`description-text ${clTern(isLong, 'long')}`}>
          {description ? description : 'No description available'}
        </div>
        {isLong && (
          <div className='desc-collapse' onClick={() => setIsShowing(true)}>
            Show more...
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskerItemText;
