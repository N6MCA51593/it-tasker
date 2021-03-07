import { EDIT_INTERACTABLES_GLOB, MOVE_DEVICE_GEO } from 'app/constants';
import { selectActiveDeviceItem } from 'app/selectors';
import DeviceEditingPopUp from 'features/geometry/interactables/devices/DeviceEditingPopUp';
import DeviceMainPopUp from 'features/geometry/interactables/devices/DeviceMainPopUp';
import DevicePopUpContainer from 'features/geometry/interactables/devices/DevicePopUpContainer';
import React from 'react';
import { useSelector } from 'react-redux';

const DevicePopUpLayer = ({ zoomLvl, globalUiState, mode }) => {
  const activeDevice = useSelector(selectActiveDeviceItem);
  const { id, floor, x, y } = activeDevice ?? {};

  const scale = zoomLvl < 2 ? (zoomLvl > 0.2 ? zoomLvl : 0.2) : 2;
  const position = {
    width: 'calc(min(500px, 70vw))',
    height: 'calc(min(300px, 50vh))',
    transform: `translate(calc(calc(min(500px, 70vw)) / -2), calc(calc(min(300px, 50vh)) * -1)) scale(${scale})`
  };

  if (!activeDevice || mode === MOVE_DEVICE_GEO) {
    return null;
  }

  return (
    <DevicePopUpContainer x={x} y={y - 20} position={position}>
      {globalUiState === EDIT_INTERACTABLES_GLOB ? (
        <DeviceEditingPopUp device={activeDevice} />
      ) : (
        <DeviceMainPopUp id={id} floor={floor} />
      )}
    </DevicePopUpContainer>
  );
};

export default DevicePopUpLayer;
