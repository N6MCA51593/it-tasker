import { useState } from 'react';

const useZoom = () => {
  const [zoom, setZoom] = useState(1);
  const step = 1.5;

  const zoomIn = () => {
    setZoom(zoom / step);
  };

  const zoomOut = () => {
    setZoom(zoom * step);
  };

  return { zoom, zoomIn, zoomOut };
};

export default useZoom;
