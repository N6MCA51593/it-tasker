import { useState } from 'react';

const useZoomAndPan = ({ width, height }) => {
  const [panVLvl, setPanVLvl] = useState(0);
  const [panHLvl, setPanHLvl] = useState(0);
  const [zoomLvl, setZoom] = useState(1.1);
  const [initCoords, setInitCoords] = useState(null);

  const zoomInStep = 0.8;
  const zoomOutStep = 1.2;
  const panStep = 50;

  const panV = (steps = 1) => {
    setPanVLvl(panVLvl + panStep * steps * zoomLvl);
  };

  const panH = (steps = 1) => {
    setPanHLvl(panHLvl + panStep * steps * zoomLvl);
  };

  const zoomIn = () => {
    setPanHLvl(panHLvl - (width / 2 - panHLvl) * (zoomInStep - 1));
    setPanVLvl(panVLvl - (height / 2 - panVLvl) * (zoomInStep - 1));
    setZoom(zoomLvl * zoomInStep);
  };

  const zoomOut = () => {
    setPanHLvl(panHLvl - (width / 2 - panHLvl) * (zoomOutStep - 1));
    setPanVLvl(panVLvl - (height / 2 - panVLvl) * (zoomOutStep - 1));
    setZoom(zoomLvl * zoomOutStep);
  };

  const freePan = ({ x, y }) => {
    panH((initCoords.x - x) / (500 * zoomLvl));
    panV((initCoords.y - y) / (500 * zoomLvl));
  };

  const wheelZoom = ({ x, y }, delta) => {
    if (delta < 0) {
      setPanHLvl(panHLvl - (x - panHLvl) * (zoomInStep - 1));
      setPanVLvl(panVLvl - (y - panVLvl) * (zoomInStep - 1));
      setZoom(zoomLvl * zoomInStep);
    } else {
      setPanHLvl(panHLvl - (x - panHLvl) * (zoomOutStep - 1));
      setPanVLvl(panVLvl - (y - panVLvl) * (zoomOutStep - 1));
      setZoom(zoomLvl * zoomOutStep);
    }
  };

  return {
    panVLvl,
    panHLvl,
    panV,
    panH,
    zoomLvl,
    zoomIn,
    zoomOut,
    freePan,
    setInitCoords,
    wheelZoom
  };
};

export default useZoomAndPan;
