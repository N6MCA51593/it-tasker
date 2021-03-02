import React from 'react';
import { useSelector } from 'react-redux';
import FloorGeometry from 'features/geometry/FloorGeometry';
import Area from 'features/geometry/interactables/areas/Area';
import Device from 'features/geometry/interactables/devices/Device';
import {
  selectActiveFloorAreas,
  selectActiveFloorDevicesOrdered,
  selectUiLoadingState
} from 'app/selectors';
import LoadingSpinner from 'common/LoadingSpinner';
import { EDIT_INTERACTABLES_GLOB } from 'app/constants';
import DeviceWithEditing from 'features/geometry/interactables/devices/DeviceWithEditing';
import { Fragment } from 'react';
import DevicePopUpLayer from 'features/geometry/interactables/devices/DevicePopUpLayer';

const Interactables = ({
  mode,
  handleClick,
  handleMouseMove,
  SVGContainer,
  zoomLvl,
  ...props
}) => {
  const areaIds = useSelector(selectActiveFloorAreas);
  const deviceIds = useSelector(selectActiveFloorDevicesOrdered);
  const isLoading = useSelector(selectUiLoadingState);
  const globalUiState = useSelector(state => state.uiState.activeGlobalState);

  const handlers = {
    onClick: handleClick ? e => handleClick(e) : null,
    onMouseMove: handleMouseMove ? e => handleMouseMove(e) : null
  };

  if (isLoading) {
    return (
      <div className='draw-area'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div {...handlers} className='draw-area'>
      {SVGContainer(
        <Fragment>
          <FloorGeometry />
          {areaIds.map(id => (
            <Area key={id} id={id} mode={mode} addDevice={props.addDevice} />
          ))}
          {deviceIds.map(id =>
            globalUiState === EDIT_INTERACTABLES_GLOB ? (
              <DeviceWithEditing key={id} id={id} mode={mode} />
            ) : (
              <Device key={id} id={id} mode={mode} />
            )
          )}
          <DevicePopUpLayer
            zoomLvl={zoomLvl}
            globalUiState={globalUiState}
            mode={mode}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Interactables;
