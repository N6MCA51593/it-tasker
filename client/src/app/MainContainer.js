import React, { useEffect } from 'react';
import Geometry from 'features/geometry/Geometry';
import { useDispatch, useSelector } from 'react-redux';
import { loadAppData } from 'features/api/loadAppData';
import TaskerContainer from 'features/tasker/TaskerContainer';
import { selectUiLoadingState } from './selectors';

const MainContainer = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUiLoadingState);
  useEffect(() => {
    dispatch(loadAppData());
  }, [dispatch]);
  return (
    !isLoading && (
      <div className='main-container'>
        <Geometry />
        <TaskerContainer />
      </div>
    )
  );
};

export default MainContainer;
