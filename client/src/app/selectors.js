import { createSelector } from '@reduxjs/toolkit';

// Floors
export const selectActiveFloor = state => state.floors.activeFloor;
export const selectAllFloorItems = state =>
  Object.values(state.floors.entities);
export const selectActiveFloorItem = state =>
  state.floors.entities[state.floors.activeFloor];

// UI State
export const selectActiveGlobalUiState = state =>
  state.uiState.activeGlobalState;
export const selectActiveGeoState = state => state.uiState.activeGeometryState;
export const selectUiLoadingState = state => state.uiState.isLoading;

// Areas
export const selectAllAreas = state => state.areas.ids;
export const selectAllAreaItems = state => state.areas.entities;
export const selectActiveArea = state => state.areas.activeArea;
export const selectActiveLabel = state => state.areas.activeLabel;
export const selectAreaById = (state, id) => state.areas.entities[id];
export const selectActiveFloorAreas = createSelector(
  [selectAllAreas, selectAllAreaItems, selectActiveFloor],
  (ids, areas, activeFloor) => ids.filter(id => areas[id].floor === activeFloor)
);

// Devices
export const selectAllDevices = state => state.devices.ids;
export const selectAllDeviceItems = state => state.devices.entities;
export const selectActiveDevice = state => state.devices.activeDevice;
export const selectIsDeviceMoving = state => state.devices.isMoving;
export const selectDeviceById = (state, id) => state.devices.entities[id];
export const selectActiveFloorDevices = createSelector(
  [selectAllDevices, selectAllDeviceItems, selectActiveFloor],
  (ids, devices, activeFloor) =>
    ids.filter(id => devices[id].floor === activeFloor)
);
// Active device must be rendered last to prevent clipping issues with the options popup
export const selectActiveFloorDevicesMemo = createSelector(
  [selectActiveFloorDevices, selectActiveDevice],
  (devices, activeDevice) =>
    activeDevice
      ? [...devices.filter(device => device !== activeDevice), activeDevice]
      : devices
);

// Walls
export const selectAllWalls = state => state.walls.ids;
export const selectAllWallItems = state => state.walls.entities;
export const selectActiveWallItem = state =>
  state.walls.entities[state.walls.activeWall];
export const selectWallById = (state, id) => state.walls.entities[id];
export const selectActiveFloorWalls = createSelector(
  [selectAllWalls, selectAllWallItems, selectActiveFloor],
  (ids, walls, activeFloor) => ids.filter(id => walls[id].floor === activeFloor)
);