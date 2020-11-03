import React, { useEffect } from 'react';
import Geometry from 'features/geometry/Geometry';
import { useDispatch, useSelector } from 'react-redux';
import { loadAppData } from '../features/api/loadAppData';
import { selectUiLoadingState } from './selectors';

const MainContainer = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUiLoadingState);
  useEffect(() => {
    dispatch(loadAppData());
  }, [dispatch]);
  return !isLoading && <Geometry />;
};

export default MainContainer;
