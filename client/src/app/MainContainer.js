import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Geometry from 'features/geometry/Geometry';
import { loadAppData } from 'features/api/loadAppData';
import TaskerContainer from 'features/tasker/TaskerContainer';
import { selectIsAuthenticated } from 'app/selectors';
import LandingPage from 'features/landing/LandingPage';
import { checkUserSession } from 'features/api/checkUserSession';
import NotificationsContainer from 'features/notifications/NotificationsContainer';

const MainContainer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
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
          <TaskerContainer />
        </div>
      ) : (
        isNoSession && <LandingPage />
      )}
      <NotificationsContainer />
    </Fragment>
  );
};

export default MainContainer;
