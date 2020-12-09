import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const useGrid = () => {
  const isGridInit = useSelector(state => state.uiState.isGrid);
  const gridStepInit = useSelector(state => state.uiState.gridStep);

  useEffect(() => {
    if (typeof isGridInit !== 'undefined' && gridStepInit) {
      setIsGrid(isGridInit);
      setGridStep(gridStepInit);
    }
  }, [isGridInit, gridStepInit]);

  const [gridStep, setGridStep] = useState(50);
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => {
    setIsGrid(!isGrid);
  };
  const gridStepUp = () => {
    setGridStep(gridStep * 2);
  };
  const gridStepDown = () => {
    setGridStep(gridStep / 2);
  };

  return { isGrid, gridStep, toggleGrid, gridStepUp, gridStepDown };
};

export default useGrid;
