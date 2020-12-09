import React, { useEffect } from 'react';
import Geometry from 'features/geometry/Geometry';
import { useDispatch } from 'react-redux';
import { loadAppData } from 'features/api/loadAppData';
import TaskerContainer from 'features/tasker/TaskerContainer';

const MainContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAppData());
  }, [dispatch]);
  return (
    <div className='main-container'>
      <Geometry />
      <TaskerContainer />
    </div>
  );
};

export default MainContainer;
