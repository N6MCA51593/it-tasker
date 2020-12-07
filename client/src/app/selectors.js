import { sortTaskerItems } from 'app/taskerSorting';
import { collectionTT, noteTT, taskTT } from 'common/uiStates';
import {
  createSelector,
  createSelectorCreator,
  defaultMemoize
} from 'reselect';

// Custom equality check to prevent filtering on every change to entity arrays
const equalityFunction = (a, b) =>
  a === b || Object.values(a).length === Object.values(b).length;

const customMemoSelector = createSelectorCreator(
  defaultMemoize,
  equalityFunction
);

// Floors
export const selectActiveFloor = state => state.floors.activeFloor;
export const selectFloorById = (state, id) => state.floors.entities[id];
export const selectAllFloors = state => state.floors.ids;
export const selectAllFloorItems = state =>
  Object.values(state.floors.entities);
export const selectAllFloorItemsSorted = createSelector(
  [selectAllFloorItems],
  entities =>
    [...entities].sort((a, b) => {
      return a.position - b.position;
    })
);
export const selectAllFloorsSorted = createSelector(
  [selectAllFloors, state => state.floors.entities],
  (ids, entities) =>
    [...ids].sort((a, b) => {
      const posA = entities[a].position;
      const posB = entities[b].position;
      return posA - posB;
    })
);
export const selectActiveFloorItem = state =>
  state.floors.entities[state.floors.activeFloor];
export const selectMaxPosition = state =>
  Math.max(...state.floors.ids.map(id => state.floors.entities[id].position));

// UI State
export const selectActiveGlobalUiState = state =>
  state.uiState.activeGlobalState;
export const selectActiveGeoState = state => state.uiState.activeGeometryState;
export const selectUiLoadingState = state => state.uiState.isLoading;
const selectActiveTaskerItemTypeSortingOrder = createSelector(
  [state => state.tasker.activeItemType, state => state.uiState],
  (activeType, uiState) => {
    switch (activeType) {
      case taskTT:
        return uiState.taskSortingOrder;
      case noteTT:
        return uiState.noteSortingOrder;
      case collectionTT:
        return uiState.collectionSortingOrder;
      default:
        return null;
    }
  }
);

// Areas
export const selectAllAreas = state => state.areas.ids;
const selectAllAreaItems = state => state.areas.entities;
const selectAllAreaItemsCustom = customMemoSelector(
  [selectAllAreaItems],
  items => items
);
export const selectActiveArea = state => state.areas.activeArea;
export const selectActiveLabel = state => state.areas.activeLabel;
export const selectAreaById = (state, id) => state.areas.entities[id];
export const selectActiveFloorAreas = createSelector(
  [selectAllAreas, selectAllAreaItemsCustom, selectActiveFloor],
  (ids, areas, activeFloor) => ids.filter(id => areas[id].floor === activeFloor)
);
export const selectChildDevices = (state, id) => state.devices.byArea[id];

// Devices
export const selectAllDevices = state => state.devices.ids;
const selectAllDeviceItems = state => state.devices.entities;
const selectAllDeviceItemsCustom = customMemoSelector(
  [selectAllDeviceItems],
  items => items
);
export const selectActiveDevice = state => state.devices.activeDevice;
export const selectIsDeviceMoving = state => state.devices.isMoving;
export const selectDeviceById = (state, id) => state.devices.entities[id];
export const selectDevicesById = (state, ids) =>
  ids && ids.map(id => state.devices.entities[id]);
export const selectActiveFloorDevices = createSelector(
  [selectAllDevices, selectAllDeviceItemsCustom, selectActiveFloor],
  (ids, devices, activeFloor) =>
    ids.filter(id => devices[id].floor === activeFloor)
);
// Active device must be rendered last to prevent clipping issues with the options popup
export const selectActiveFloorDevicesOrdered = createSelector(
  [selectActiveFloorDevices, selectActiveDevice],
  (devices, activeDevice) =>
    activeDevice
      ? [...devices.filter(device => device !== activeDevice), activeDevice]
      : devices
);

// Walls
export const selectAllWalls = state => state.walls.ids;
const selectAllWallItems = state => state.walls.entities;
const selectAllWallItemsCustom = customMemoSelector(
  [selectAllWallItems],
  items => items
);
export const selectActiveWallItem = state =>
  state.walls.entities[state.walls.activeWall];
export const selectWallById = (state, id) => state.walls.entities[id];
export const selectActiveFloorWalls = createSelector(
  [selectAllWalls, selectAllWallItemsCustom, selectActiveFloor],
  (ids, walls, activeFloor) => ids.filter(id => walls[id].floor === activeFloor)
);

// Tasker
export const selectTaskerItemById = (state, id) => state.tasker.entities[id];
export const selectByDeviceEntry = (state, id) => state.tasker.byDevice[id];
export const selectDeviceActiveItemStatus = (state, id) =>
  state.tasker.byDevice[id]?.[state.tasker.activeItem];
export const selectTaskerActiveItemProperties = state => {
  return {
    activeItem: state.tasker.activeItem,
    activeItemType: state.tasker.activeItemType,
    isEditing: state.tasker.isEditing
  };
};
const selectAllTaskerItemIds = state => state.tasker.ids;
const selectAllTaskerItemEntities = state => state.tasker.entities;
export const selectAllCollectionItems = createSelector(
  [selectAllTaskerItemIds, selectAllTaskerItemEntities],
  (ids, entities) =>
    ids.filter(id => entities[id].type === 'collection').map(id => entities[id])
);
export const selectAllActiveItemTypeTasks = createSelector(
  [
    selectAllTaskerItemIds,
    selectAllTaskerItemEntities,
    state => state.tasker.activeItemType,
    state => state.tasker.isCheckedOffTaskFilter,
    state => state.tasker.isCheckedOffNoteFilter
  ],
  (ids, entities, activeItemType, taskFilter, noteFilter) =>
    ids.filter(id => {
      const { type, isCheckedOff } = entities[id];
      if (type === activeItemType) {
        if (type === taskTT) {
          if (isCheckedOff === taskFilter || taskFilter === null) {
            return true;
          }
        } else if (type === noteTT) {
          if (isCheckedOff === noteFilter || noteFilter === null) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    })
);
export const selectAllActiveItemTypeTasksSorted = createSelector(
  [
    selectAllActiveItemTypeTasks,
    selectAllTaskerItemEntities,
    selectActiveTaskerItemTypeSortingOrder,
    state => state.tasker.byDevice
  ],
  (ids, entities, sortingOrder, byDevice) => {
    const sorting = sortTaskerItems(entities, sortingOrder, byDevice);
    return ids.sort((a, b) => sorting(a, b));
  }
);
export const selectAllTasks = createSelector(
  [selectAllTaskerItemIds, selectAllTaskerItemEntities],
  (ids, entities) => ids.filter(id => entities[id].type === 'task')
);
