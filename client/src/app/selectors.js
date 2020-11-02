import { createSelector } from '@reduxjs/toolkit';

// Areas
export const selectAllAreas = state => state.areas.ids;
export const selectActiveArea = state => state.areas.activeArea;
export const selectActiveLabel = state => state.areas.activeLabel;
export const selectAreaById = (state, id) => state.areas.entities[id];

// Devices
export const selectAllDevices = state => state.devices.ids;
export const selectActiveDevice = state => state.devices.activeDevice;
export const selectIsDeviceMoving = state => state.devices.isMoving;
export const selectDeviceById = (state, id) => state.devices.entities[id];
// Active device must be rendered last to prevent clipping issues with the options popup
export const selectAllDevicesMemo = createSelector(
  [selectAllDevices, selectActiveDevice],
  (devices, activeDevice) =>
    activeDevice
      ? [...devices.filter(device => device !== activeDevice), activeDevice]
      : devices
);

// Walls
export const selectAllWalls = state => state.walls.ids;
export const selectActiveWallItem = state =>
  state.walls.entities[state.walls.activeWall];
export const selectWallById = (state, id) => state.walls.entities[id];

// Floors
export const selectActiveFloor = state => state.floors.activeFloor;
export const selectActiveFloorItem = state =>
  state.floors.entities[state.floors.activeFloor];

// UI State
export const selectActiveGlobalUiState = state =>
  state.uiState.activeGlobalState;
export const selectActiveGeoState = state => state.uiState.activeGeometryState;
export const selectUiLoadingState = state => state.uiState.isLoading;
