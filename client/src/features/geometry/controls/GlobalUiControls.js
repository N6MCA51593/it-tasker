import React, { useState } from 'react';
import { logout } from 'features/api/logout';
import { setUiGlobalState } from 'app/uiStateSlice';
import { useDispatch } from 'react-redux';
import {
  EDIT_GEOM_GLOB,
  EDIT_INTERACTABLES_GLOB,
  MAIN_GLOB
} from 'app/constants';
import Button from 'features/geometry/controls/Button';

const GlobalUiControls = ({ uiState }) => {
  const dispatch = useDispatch();
  const [isShowing, setIsShowing] = useState(false);
  const type =
    uiState === EDIT_GEOM_GLOB || uiState === EDIT_INTERACTABLES_GLOB
      ? uiState
      : MAIN_GLOB;
  return (
    <div className='state-nav-controls'>
      {isShowing && (
        <div className='togglable-container'>
          <Button handleClick={() => dispatch(logout())} type='logout-ic' />
          <Button
            handleClick={() => dispatch(setUiGlobalState(MAIN_GLOB))}
            type={MAIN_GLOB}
          />
          <Button
            handleClick={() => dispatch(setUiGlobalState(EDIT_GEOM_GLOB))}
            type={EDIT_GEOM_GLOB}
          />
          <Button
            handleClick={() =>
              dispatch(setUiGlobalState(EDIT_INTERACTABLES_GLOB))
            }
            type={EDIT_INTERACTABLES_GLOB}
          />
        </div>
      )}
      <Button handleClick={() => setIsShowing(!isShowing)} type={type} />
    </div>
  );
};

export default GlobalUiControls;
