import { useState } from 'react';

const useGrid = () => {
  const gridStep = 50;
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => {
    setIsGrid(!isGrid);
  };

  return { isGrid, gridStep, toggleGrid };
};

export default useGrid;
