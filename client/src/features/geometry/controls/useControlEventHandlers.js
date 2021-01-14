import { useState } from 'react';
import { useSelector } from 'react-redux';

const useControlEventHandlers = ({
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
    if (isPointerDown) {
      freePan(getRelCoord(e));
    }
  };
  const handleTouchStart = e => {
    if (!isHoveringOverDevicePopUp) {
      if (!isPointer) {
        setIsPointer(true);
      }
      setInitCoords(getRelCoord(e));
      setIsPointerDown(true);
    }
  };
  const handlePointerDown = e => {
    if (!isHoveringOverDevicePopUp) {
      setInitCoords(getRelCoord(e));
      setIsPointerDown(true);
    }
  };
  const handlePointerUp = () => {
    setInitCoords(null);
    setIsPointerDown(false);
  };
  const handlePointerLeave = () => {
    if (!isPointer) {
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
