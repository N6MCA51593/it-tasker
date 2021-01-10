import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useZoomAndPan = ({ width, height }) => {
  const initZoomLvl = useSelector(state => state.uiState.zoomLvl);
  const initPanVLvl = useSelector(state => state.uiState.panVLvl);
  const initPanHLvl = useSelector(state => state.uiState.panHLvl);
  const [panVLvl, setPanVLvl] = useState(initPanVLvl);
  const [panHLvl, setPanHLvl] = useState(initPanHLvl);
  const [zoomLvl, setZoom] = useState(initZoomLvl);
  const [initCoords, setInitCoords] = useState(null);
  const dispatch = useDispatch();

  const zoomInStep = 0.8;
  const zoomOutStep = 1.2;
  const panStep = 50;
  const panSmoothing = 0.25;
  const minZoom = 0.08;
  const maxZoom = 5;

  useEffect(() => {
    setZoom(initZoomLvl);
    setPanVLvl(initPanVLvl);
    setPanHLvl(initPanHLvl);
  }, [initZoomLvl, initPanHLvl, initPanVLvl, dispatch]);

  const panV = (steps = 1) => {
    setPanVLvl(panVLvl + panStep * steps * zoomLvl);
  };

  const panH = (steps = 1) => {
    setPanHLvl(panHLvl + panStep * steps * zoomLvl);
  };

  const zoomIn = () => {
    if (zoomLvl > minZoom) {
      const cx = panHLvl + (width * zoomLvl) / 2;
      const cy = panVLvl + (height * zoomLvl) / 2;
      setPanHLvl(panHLvl - (cx - panHLvl) * (zoomInStep - 1));
      setPanVLvl(panVLvl - (cy - panVLvl) * (zoomInStep - 1));
      setZoom(zoomLvl * zoomInStep);
    }
  };

  const zoomOut = () => {
    if (zoomLvl < maxZoom) {
      const cx = panHLvl + (width * zoomLvl) / 2;
      const cy = panVLvl + (height * zoomLvl) / 2;
      setPanHLvl(panHLvl - (cx - panHLvl) * (zoomOutStep - 1));
      setPanVLvl(panVLvl - (cy - panVLvl) * (zoomOutStep - 1));
      setZoom(zoomLvl * zoomOutStep);
    }
  };

  const freePan = ({ x, y }) => {
    panH(((initCoords.x - x) * panSmoothing) / zoomLvl / panStep);
    panV(((initCoords.y - y) * panSmoothing) / zoomLvl / panStep);
  };

  const wheelZoom = ({ x, y }, delta) => {
    if (delta < 0) {
      if (zoomLvl > minZoom) {
        setPanHLvl(panHLvl - (x - panHLvl) * (zoomInStep - 1));
        setPanVLvl(panVLvl - (y - panVLvl) * (zoomInStep - 1));
        setZoom(zoomLvl * zoomInStep);
      }
    } else {
      if (zoomLvl < maxZoom) {
        setPanHLvl(panHLvl - (x - panHLvl) * (zoomOutStep - 1));
        setPanVLvl(panVLvl - (y - panVLvl) * (zoomOutStep - 1));
        setZoom(zoomLvl * zoomOutStep);
      }
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
