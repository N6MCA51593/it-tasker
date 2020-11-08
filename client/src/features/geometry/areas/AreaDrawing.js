import React from 'react';
import { useSelector } from 'react-redux';
import FloorGeometry from 'features/geometry/FloorGeometry';
import Grid from 'features/geometry/Grid';
import Area from 'features/geometry/areas/Area';
import Device from 'features/geometry/devices/Device';
import {
  selectActiveFloorAreas,
  selectActiveFloorDevicesOrdered
} from 'app/selectors';
import useEditing from 'features/geometry/areas/useEditing';
import Defs from 'features/geometry/Defs';

const AreaDrawing = ({
  mode,
  isGrid,
  getRelCoord,
  panHLvl,
  panVLvl,
  zoomLvl,
  width,
  height,
  gridStep
}) => {
  const areaIds = useSelector(selectActiveFloorAreas);
  const deviceIds = useSelector(selectActiveFloorDevicesOrdered);
  const { handleClick, handleMouseMove, activeDevice, addDevice } = useEditing({
    mode,
    isGrid,
    getRelCoord
  });

  const handlers = {
    onClick: e => handleClick(e),
    onMouseMove: handleMouseMove ? e => handleMouseMove(e) : null
  };

  return (
    <div {...handlers} className='draw-area'>
      <svg
        viewBox={`${panHLvl} ${panVLvl} ${width * zoomLvl} ${height * zoomLvl}`}
      >
        <Defs />
        {isGrid && (
          <Grid
            panVLvl={panVLvl}
            panHLvl={panHLvl}
            width={width * zoomLvl}
            height={height * zoomLvl}
            gridStep={gridStep}
          />
        )}
        <FloorGeometry />
        {areaIds.map(id => (
          <Area key={id} id={id} mode={mode} addDevice={addDevice} />
        ))}
        {deviceIds.map(id => (
          <Device key={id} id={id} mode={mode} activeDevice={activeDevice} />
        ))}
      </svg>
    </div>
  );
};

export default AreaDrawing;
