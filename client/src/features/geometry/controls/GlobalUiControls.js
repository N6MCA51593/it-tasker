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
    <div
      className='state-nav-controls'
      onClick={() => setIsShowing(!isShowing)}
    >
      {isShowing && (
        <div className='togglable-container'>
          <div
            className='controls-button-labeled'
            onClick={() => dispatch(logout())}
          >
            <Button type='logout-ic' mod='m' />
            <p>Log Out</p>
          </div>
          {type !== MAIN_GLOB && (
            <div
              className='controls-button-labeled'
              onClick={() => dispatch(setUiGlobalState(MAIN_GLOB))}
            >
              <Button type={MAIN_GLOB} mod='m' />
              <p>Main</p>
            </div>
          )}
          {type !== EDIT_GEOM_GLOB && (
            <div
              className='controls-button-labeled'
              onClick={() => dispatch(setUiGlobalState(EDIT_GEOM_GLOB))}
            >
              <Button type={EDIT_GEOM_GLOB} mod='m' />
              <p>Edit geometry</p>
            </div>
          )}
          {type !== EDIT_INTERACTABLES_GLOB && (
            <div
              className='controls-button-labeled'
              onClick={() =>
                dispatch(setUiGlobalState(EDIT_INTERACTABLES_GLOB))
              }
            >
              <Button type={EDIT_INTERACTABLES_GLOB} mod='m' />
              <p>Edit areas and devices</p>
            </div>
          )}
        </div>
      )}
      <Button type={type} mod='shadow' />
    </div>
  );
};

export default GlobalUiControls;
