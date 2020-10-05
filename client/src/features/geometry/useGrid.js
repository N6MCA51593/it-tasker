import { useState } from 'react';

const useGrid = () => {
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
