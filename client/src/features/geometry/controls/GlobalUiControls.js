import React, { useRef, useState } from 'react';
import { logout } from 'features/api/logout';
import { setUiGlobalState } from 'app/uiStateSlice';
import { useDispatch } from 'react-redux';
import {
  EDIT_GEOM_GLOB,
  EDIT_INTERACTABLES_GLOB,
  MAIN_GLOB
} from 'app/constants';
import Button from 'features/geometry/controls/Button';
import useOnClickOutside from 'common/useOnClickOutside';
import LabeledButton from 'features/geometry/controls/LabeledButton';

const GlobalUiControls = ({ uiState }) => {
  const dispatch = useDispatch();
  const [isShowing, setIsShowing] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsShowing(false));
  const type =
    uiState === EDIT_GEOM_GLOB || uiState === EDIT_INTERACTABLES_GLOB
      ? uiState
      : MAIN_GLOB;
  return (
    <div
      className='state-nav-controls'
      onClick={() => setIsShowing(!isShowing)}
      ref={ref}
    >
      {isShowing && (
        <div className='controls-container'>
          <LabeledButton
            handleClick={() => dispatch(logout())}
            type={'logout'}
            label='Log Out'
          />
          {type !== MAIN_GLOB && (
            <LabeledButton
              handleClick={() => dispatch(setUiGlobalState(MAIN_GLOB))}
              type={MAIN_GLOB}
              label='Main'
            />
          )}
          {type !== EDIT_GEOM_GLOB && (
            <LabeledButton
              handleClick={() => dispatch(setUiGlobalState(EDIT_GEOM_GLOB))}
              type={EDIT_GEOM_GLOB}
              label='Edit geometry'
            />
          )}
          {type !== EDIT_INTERACTABLES_GLOB && (
            <LabeledButton
              handleClick={() =>
                dispatch(setUiGlobalState(EDIT_INTERACTABLES_GLOB))
              }
              type={EDIT_INTERACTABLES_GLOB}
              label='Edit areas and devices'
            />
          )}
        </div>
      )}
      <Button type={type} mod='shadow hov' />
    </div>
  );
};

export default GlobalUiControls;
