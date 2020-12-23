import React, { useEffect } from 'react';
import Geometry from 'features/geometry/Geometry';
import { useDispatch, useSelector } from 'react-redux';
import { loadAppData } from 'features/api/loadAppData';
import TaskerContainer from 'features/tasker/TaskerContainer';
import { selectIsAuthenticated } from 'app/selectors';
import LandingPage from 'features/landing/LandingPage';
import { checkUserSession } from 'features/api/checkUserSession';

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
  return isAuthenticated ? (
    <div className='main-container'>
      <Geometry />
      <TaskerContainer />
    </div>
  ) : (
    isNoSession && <LandingPage />
  );
};

export default MainContainer;
