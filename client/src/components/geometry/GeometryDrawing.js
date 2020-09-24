import React, { useRef, useState, Fragment } from 'react';
import Wall from './Wall';
import Grid from './Grid';
import GeometryControls from './GeometryControls';
import useDimensions from './useDimensions';
import useCoordinates from './useCoordinates';
import useZoomAndPan from './useZoomAndPan';
import useGrid from './useGrid';
import { useSelector, useDispatch } from 'react-redux';
import { add, setModeR } from '../../store/wallSlice';
import { setW } from '../../store/activeWallSlice';

const GeometryDrawing = () => {
  const [walls, setWalls] = useState([]);
  const [activeWall, setActiveWall] = useState(null);
  //const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('draw');
  const ref = useRef();
  const { width, height } = useDimensions(ref);
  const { isGrid, gridStep, toggleGrid } = useGrid();
  const {
    zoomLvl,
    zoomIn,
    zoomOut,
    panH,
    panV,
    panHLvl,
    panVLvl
  } = useZoomAndPan({ width, height });
  const { getRelCoord } = useCoordinates({
    isGrid,
    gridStep,
    zoomLvl,
    panHLvl,
    panVLvl,
    ref
  });
  const dispatch = useDispatch();
  const ids = useSelector(state => state.walls.ids);
  const activeWallR = useSelector(state =>
    state.walls.activeWall ? state.walls.entities[activeWall] : null
  );

  const handleClick = e => {
    if (mode === 'draw') {
      if (activeWall) {
        setWalls([
          ...walls,
          {
            x1: activeWall.x1,
            y1: activeWall.y1,
            x2: isGrid ? getRelCoord(e, true).x : activeWall.x2,
            y2: isGrid ? getRelCoord(e, true).y : activeWall.y2
          }
        ]);
      }

      const { x, y } = getRelCoord(e, true);

      dispatch(
        add({
          coords: {
            x1: activeWallR ? activeWallR.x1 : x,
            y1: activeWallR ? activeWallR.y1 : y,
            x2: activeWallR
              ? isGrid
                ? getRelCoord(e, true).x
                : activeWallR.x2
              : x,
            y2: activeWallR
              ? isGrid
                ? getRelCoord(e, true).y
                : activeWallR.y2
              : y
          },
          isActive: !activeWallR
        })
      );

      setActiveWall({
        x1: x,
        y1: y,
        x2: x,
        y2: y
      });
    }
  };

  const handleMouseMove = e => {
    if (activeWall) {
      //console.log(getRelCoord(e));
      setActiveWall({
        ...activeWall,
        x2: getRelCoord(e).x,
        y2: getRelCoord(e).y
      });
    }
  };

  const handleWallClick = (e, coords) => {
    e.stopPropagation();
    if (mode === 'draw') {
      if (!activeWall) {
        setActiveWall({
          x1: coords.x,
          y1: coords.y,
          x2: coords.x,
          y2: coords.y
        });
      } else {
        setWalls([...walls, { ...activeWall, x2: coords.x, y2: coords.y }]);
        setActiveWall(null);
      }
    } else if (mode === 'remove') {
      setWalls([
        ...walls.filter(
          el =>
            el.x1 !== coords.x1 ||
            el.x2 !== coords.x2 ||
            el.y1 !== coords.y1 ||
            el.y2 !== coords.y2
        )
      ]);
    } else if (mode === 'move') {
      if (activeWall) {
        setWalls([...walls, { ...activeWall, x2: coords.x, y2: coords.y }]);
        setActiveWall(null);
      } else {
        setWalls([
          ...walls.filter(
            el =>
              el.x1 !== coords.x1 ||
              el.x2 !== coords.x2 ||
              el.y1 !== coords.y1 ||
              el.y2 !== coords.y2
          )
        ]);
        setActiveWall({
          x1: coords.x,
          y1: coords.y,
          x2: getRelCoord(e),
          y2: getRelCoord(e)
        });
      }
    }
  };

  return (
    <Fragment>
      <div
        ref={ref}
        onClick={e => handleClick(e)}
        onMouseMove={e => handleMouseMove(e)}
        className='draw-area'
      >
        <svg
          viewBox={`${panHLvl} ${panVLvl} ${width * zoomLvl} ${
            height * zoomLvl
          }`}
        >
          {isGrid && (
            <Grid
              panVLvl={panVLvl}
              panHLvl={panHLvl}
              width={width * zoomLvl}
              height={height * zoomLvl}
            />
          )}
          {activeWall && <Wall {...activeWall} />}
          {walls.map((e, i) => (
            <Wall
              key={i}
              {...e}
              mode={mode}
              handleWallClick={handleWallClick}
              getRelCoord={getRelCoord}
            />
          ))}
        </svg>
      </div>
      <GeometryControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        panH={panH}
        panV={panV}
        setMode={setMode}
        toggleGrid={toggleGrid}
      />
    </Fragment>
  );
};

export default GeometryDrawing;
