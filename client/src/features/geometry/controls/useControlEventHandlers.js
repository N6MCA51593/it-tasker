import { useState } from 'react';

const useControlEventHandlers = ({
  getRelCoord,
  freePan,
  setInitCoords,
  wheelZoom
}) => {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const handlePointerMove = e => {
    if (isPointerDown) {
      freePan(getRelCoord(e));
    }
  };
  const handleTouchStart = e => {
    if (!isPointer) {
      setIsPointer(true);
    }
    setInitCoords(getRelCoord(e));
    setIsPointerDown(true);
  };
  const handlePointerDown = e => {
    setInitCoords(getRelCoord(e));
    setIsPointerDown(true);
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
