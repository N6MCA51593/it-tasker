import React, { useEffect } from 'react';
import Geometry from 'features/geometry/Geometry';
import { useDispatch, useSelector } from 'react-redux';
import { loadAppData } from 'features/api/loadAppData';
import { selectUiLoadingState } from './selectors';
import TaskContainer from 'features/tasks/TaskContainer';

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
        <TaskContainer />
      </div>
    )
  );
};

export default MainContainer;
