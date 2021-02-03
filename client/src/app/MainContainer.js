import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Geometry from 'features/geometry/Geometry';
import { loadAppData } from 'features/api/loadAppData';
import TaskerContainer from 'features/tasker/TaskerContainer';
import {
  selectActiveGlobalUiState,
  selectIsAuthenticated
} from 'app/selectors';
import LandingPage from 'features/landing/LandingPage';
import { checkUserSession } from 'features/api/checkUserSession';
import NotificationsContainer from 'features/notifications/NotificationsContainer';
import { EDIT_GEOM_GLOB, EDIT_INTERACTABLES_GLOB } from 'app/constants';

const MainContainer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeGlobalUiState = useSelector(selectActiveGlobalUiState);
  const isNoSession = useSelector(state => state.authState.isNoSession);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadAppData());
    } else {
      dispatch(checkUserSession());
    }
  }, [dispatch, isAuthenticated]);
  return (
    <Fragment>
      {isAuthenticated ? (
        <div className='main-container'>
          <Geometry />
          {activeGlobalUiState !== EDIT_INTERACTABLES_GLOB &&
            activeGlobalUiState !== EDIT_GEOM_GLOB && <TaskerContainer />}
        </div>
      ) : (
        isNoSession && <LandingPage />
      )}
      <NotificationsContainer />
    </Fragment>
  );
};

export default MainContainer;
