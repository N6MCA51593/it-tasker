import { useState } from 'react';

const useZoomAndPan = ({ width, height }) => {
  const [panVLvl, setPanVLvl] = useState(0);
  const [initCoords, setInitCoords] = useState(null);
  const [panHLvl, setPanHLvl] = useState(0);
  const [zoomLvl, setZoom] = useState(1.1);

  const zoomStep = 2;
  const panStep = 50;

  const panV = (steps = 1) => {
    setPanVLvl(panVLvl + panStep * steps * zoomLvl);
  };

  const panH = (steps = 1) => {
    setPanHLvl(panHLvl + panStep * steps * zoomLvl);
  };

  const zoomIn = () => {
    setZoom(zoomLvl / zoomStep);
    setPanHLvl(panHLvl + (width * zoomLvl) / 4);
    setPanVLvl(panVLvl + (height * zoomLvl) / 4);
  };

  const zoomOut = () => {
    setZoom(zoomLvl * zoomStep);
    setPanHLvl(panHLvl - (width * zoomLvl) / 2);
    setPanVLvl(panVLvl - (height * zoomLvl) / 2);
  };

  const freePan = ({ x, y }) => {
    panH((initCoords.x - x) / (500 * zoomLvl));
    panV((initCoords.y - y) / (500 * zoomLvl));
  };

  const wheelZoom = ({ x, y }, delta) => {
    if (delta < 0) {
      // const newX =
      //   panHLvl + panStep * ((x - width / 2) / (100 * zoomLvl)) * zoomLvl;
      // const newY =
      //   panVLvl + panStep * ((y - height / 2) / (100 * zoomLvl)) * zoomLvl;
      const newX = x - width / 2;
      const newY = y - height / 2;
      console.log(x);
      console.log(newX);

      setZoom(zoomLvl / zoomStep);
      // setPanHLvl(newX);
      // setPanVLvl(newY);
      setPanHLvl(newX + (width * zoomLvl) / (4 * zoomLvl));
      setPanVLvl(newY + (height * zoomLvl) / (4 * zoomLvl));
    } else {
      // const newX =
      //   panHLvl + panStep * ((width / 2 - x) / (100 * zoomLvl)) * zoomLvl;
      // const newY =
      //   panVLvl + panStep * ((height / 2 - y) / (100 * zoomLvl)) * zoomLvl;
      const newX = x - width / 2;
      const newY = y - height / 2;
      setZoom(zoomLvl * zoomStep);
      setPanHLvl(newX);
      setPanVLvl(newY);
      // setPanHLvl(newX - (width * zoomLvl) / 2);
      // setPanVLvl(newY - (height * zoomLvl) / 2);
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
