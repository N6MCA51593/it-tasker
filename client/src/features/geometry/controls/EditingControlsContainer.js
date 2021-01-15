import clTern from 'common/clTern';
import Button from 'features/geometry/controls/Button';
import React, { useState } from 'react';

const EditingControlsContainer = ({ children, save, cancel, isDisabled }) => {
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
            mod={`editing-controls-side ${clTern(!isShowing, 'shadow')}`}
            handleClick={() => setIsShowing(!isShowing)}
          />
          <div>
            <Button
              type='x'
              mod={`editing-controls-side  ${clTern(!isShowing, 'shadow')}`}
              handleClick={cancel}
            />
            <Button
              type='save'
              mod={`editing-controls-side ${clTern(
                !isShowing,
                'shadow'
              )} ${clTern(isDisabled, 'disabled')}`}
              handleClick={save}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingControlsContainer;
