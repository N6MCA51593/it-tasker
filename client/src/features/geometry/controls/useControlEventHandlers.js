import { useState } from 'react';
import { NAV_GEO } from 'app/constants';
import { useSelector } from 'react-redux';

const useControlEventHandlers = ({
  mode,
  getRelCoord,
  freePan,
  setInitCoords,
  wheelZoom
}) => {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const isHoveringOverDevicePopUp = useSelector(
    state => state.uiState.isHoveringOverDevicePopUp
  );

  const handlePointerMove = e => {
    if (mode === NAV_GEO && isPointerDown) {
      freePan(getRelCoord(e));
    }
  };
  const handleTouchStart = e => {
    if (mode === NAV_GEO && !isHoveringOverDevicePopUp) {
      if (!isPointer) {
        setIsPointer(true);
      }
      setInitCoords(getRelCoord(e));
      setIsPointerDown(true);
    }
  };
  const handlePointerDown = e => {
    if (mode === NAV_GEO && !isHoveringOverDevicePopUp) {
      setInitCoords(getRelCoord(e));
      setIsPointerDown(true);
    }
  };
  const handlePointerUp = () => {
    if (mode === NAV_GEO) {
      setInitCoords(null);
      setIsPointerDown(false);
    }
  };
  const handlePointerLeave = () => {
    if (mode === NAV_GEO && !isPointer) {
      setInitCoords(null);
      setIsPointerDown(false);
    }
  };
  const handleWheel = e => {
    wheelZoom(getRelCoord(e), e.deltaY);
  };

  return {
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
    handleTouchStart
  };
};

export default useControlEventHandlers;
