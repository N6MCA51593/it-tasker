import { useState } from 'react';

const useZoom = () => {
  const [zoomLvl, setZoom] = useState(1);
  const step = 1.5;

  const zoomIn = () => {
    setZoom(zoomLvl / step);
  };

  const zoomOut = () => {
    setZoom(zoomLvl * step);
  };

  return { zoomLvl, zoomIn, zoomOut };
};

export default useZoom;
