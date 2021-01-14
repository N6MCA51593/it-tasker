import clTern from 'common/clTern';
import Button from 'features/geometry/controls/Button';
import React, { useState } from 'react';

const EditingControlsContainer = ({ children }) => {
  const [isShowing, setIsShowing] = useState(true);
  return (
    <div className='editing-controls-lane'>
      <div
        className={`editing-controls-container ${clTern(!isShowing, 'hidden')}`}
      >
        {children}
        <div className='toggle-editing-controls'>
          <Button
            type={isShowing ? 'left' : 'right'}
            mod={`hide-toggle ${clTern(!isShowing, 'shadow')}`}
            handleClick={() => setIsShowing(!isShowing)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditingControlsContainer;
