import { sortTaskerItems } from 'features/tasker/taskerSorting';
import {
  COLLECTION_TT,
  EDIT_INTERACTABLES_GLOB,
  EDIT_TASKER_ITEMS_GLOB,
  VIEW_TASKER_ITEMS_GLOB,
  NOTE_TT,
  TASK_TT,
  MAIN_GLOB
} from 'app/constants';
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
      case TASK_TT:
        return uiState.taskSortingOrder;
      case NOTE_TT:
        return uiState.noteSortingOrder;
      case COLLECTION_TT:
        return uiState.collectionSortingOrder;
      default:
        return null;
    }
  }
);
export const selectPersistingUiStateValues = state => {
  const {
    taskSortingOrder,
    noteSortingOrder,
    collectionSortingOrder,
    isCheckedOffTaskFilter,
    isCheckedOffNoteFilter,
    activeDeviceFilters,
    taskAreaSortingOrder,
    noteAreaSortingOrder,
    collectionAreaSortingOrder,
    taskDeviceSortingOrder,
    noteDeviceSortingOrder,
    collectionDeviceSortingOrder
  } = state.uiState;
  return {
    taskSortingOrder,
    noteSortingOrder,
    collectionSortingOrder,
    isCheckedOffTaskFilter,
    isCheckedOffNoteFilter,
    activeDeviceFilters,
    taskAreaSortingOrder,
    noteAreaSortingOrder,
    collectionAreaSortingOrder,
    taskDeviceSortingOrder,
    noteDeviceSortingOrder,
    collectionDeviceSortingOrder
  };
};

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
export const selectIsAreaHighlighted = () =>
  createSelector(
    state => state.uiState.activeGlobalState,
    state => state.devices.byArea,
    state => state.tasker.byDevice,
    state => state.tasker.entities,
    state => state.tasker.activeItem,
    (_, id) => id,
    (
      activeGlobalState,
      byArea,
      byDevice,
      taskerItems,
      activeTaskerItem,
      id
    ) => {
      if (activeGlobalState !== EDIT_INTERACTABLES_GLOB) {
        if (byArea[id]) {
          for (const device of byArea[id]) {
            if (byDevice[device]) {
              if (
                (activeGlobalState === VIEW_TASKER_ITEMS_GLOB ||
                  activeGlobalState === EDIT_TASKER_ITEMS_GLOB) &&
                typeof byDevice[device][activeTaskerItem] !== 'undefined'
              ) {
                return true;
              }

              for (const taskerItem in byDevice[device]) {
                if (
                  activeGlobalState === MAIN_GLOB &&
                  !byDevice[device][taskerItem].isCheckedOff &&
                  taskerItems[taskerItem].type === TASK_TT
                ) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
  );

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
  ids?.map(id => state.devices.entities[id]);
export const selectActiveFloorDevices = createSelector(
  [selectAllDevices, selectAllDeviceItemsCustom, selectActiveFloor],
  (ids, devices, activeFloor) =>
    ids.filter(id => devices[id].floor === activeFloor)
);
export const selectHasActiveTaskerItemsOfType = () =>
  createSelector(
    state => state.tasker.byDevice,
    state => state.tasker.entities,
    (_, params) => params,
    (byDevice, taskerItems, params) => {
      const { id, type } = params;
      if (byDevice[id]) {
        const taskIds = Object.keys(byDevice[id]);
        return !!taskIds.filter(
          taskId =>
            typeof byDevice[id][taskId] !== 'undefined' &&
            taskerItems[taskId].type === type &&
            (type === TASK_TT
              ? !byDevice[id][taskId].isCheckedOff
              : taskerItems[taskId].isCheckedOff === false)
        ).length;
      }
    }
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
export const selectDeviceActiveTaskerItems = () =>
  createSelector(
    state => state.tasker.byDevice,
    state => state.tasker.entities,
    (_, id) => id,
    (byDevice, entities, id) => {
      if (byDevice[id]) {
        const activeItems = Object.keys(byDevice[id]).filter(
          taskId =>
            typeof byDevice[id][taskId] !== 'undefined' &&
            (entities[taskId].type === TASK_TT
              ? !byDevice[id][taskId].isCheckedOff
              : entities[taskId].isCheckedOff === false)
        );
        return activeItems.map(taskId => entities[taskId]);
      } else {
        return null;
      }
    }
  );
export const selectDeviceActiveItemStatus = (state, id) =>
  state.tasker.byDevice[id]?.[state.tasker.activeItem]?.isCheckedOff;
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
    state => state.uiState.isCheckedOffTaskFilter,
    state => state.uiState.isCheckedOffNoteFilter
  ],
  (ids, entities, activeItemType, taskFilter, noteFilter) =>
    ids.filter(id => {
      const { type, isCheckedOff } = entities[id];
      if (type === activeItemType) {
        if (type === TASK_TT) {
          if (isCheckedOff === taskFilter || taskFilter === null) {
            return true;
          }
        } else if (type === NOTE_TT) {
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
export const getTaskerCompletionTable = createSelector(
  [
    selectAllTaskerItemIds,
    selectAllTaskerItemEntities,
    state => state.tasker.byDevice
  ],
  (ids, entities, byDevice) => {
    let completionTable = {};
    for (const id of ids) {
      const { type, isCheckedOff, devices } = entities[id];
      if (type !== TASK_TT) {
        completionTable[id] = null;
      } else if (isCheckedOff) {
        completionTable[id] = 1;
      } else if (devices && devices.length > 0) {
        completionTable[id] =
          devices.filter(deviceId => byDevice[deviceId][id].isCheckedOff)
            .length / devices.length;
      } else {
        completionTable[id] = 0;
      }
    }
    return completionTable;
  }
);
export const selectAllActiveItemTypeTasksSorted = createSelector(
  [
    selectAllActiveItemTypeTasks,
    selectAllTaskerItemEntities,
    selectActiveTaskerItemTypeSortingOrder,
    getTaskerCompletionTable
  ],
  (ids, entities, sortingOrder, completionTable) => {
    const sorting = sortTaskerItems(entities, sortingOrder, completionTable);
    return [...ids].sort((a, b) => sorting(a, b));
  }
);
export const selectAllTasks = createSelector(
  [selectAllTaskerItemIds, selectAllTaskerItemEntities],
  (ids, entities) => ids.filter(id => entities[id].type === 'task')
);
export const selectActiveSortingOrder = state => {
  const { activeItem, activeItemType } = state.tasker;
  if (activeItemType === TASK_TT) {
    return activeItem
      ? {
          area: state.uiState.taskAreaSortingOrder,
          device: state.uiState.taskDeviceSortingOrder
        }
      : state.uiState.taskSortingOrder;
  } else if (activeItemType === NOTE_TT) {
    return activeItem
      ? {
          area: state.uiState.noteAreaSortingOrder,
          device: state.uiState.noteDeviceSortingOrder
        }
      : state.uiState.noteSortingOrder;
  } else if (activeItemType === COLLECTION_TT) {
    return activeItem
      ? {
          area: state.uiState.collectionAreaSortingOrder,
          device: state.uiState.collectionDeviceSortingOrder
        }
      : state.uiState.collectionSortingOrder;
  }
};

export const getTaskerProgressOverview = createSelector(
  [
    state => state.tasker.entities[state.tasker.activeItem],
    state => state.tasker.byDevice,
    selectAllDeviceItems
  ],
  (taskerItem, byDevice, deviceEnts) => {
    let progressTable = { totalActive: 0, totalCheckedOff: 0 };
    const { floors = [], devices, id, type } = taskerItem;

    if (type !== TASK_TT || floors.length === 0) {
      return null;
    }
    const deviceFloor = devices.reduce((acc, id) => {
      const floor = deviceEnts[id].floor;
      if (acc[floor]) {
        acc[floor].push(id);
      } else {
        acc[floor] = [];
        acc[floor].push(id);
      }
      return acc;
    }, {});

    const floorsDeduped = new Set(floors);
    for (const floor of floorsDeduped) {
      const floorDevices = deviceFloor[floor];
      progressTable[floor] = { checkedOff: 0, active: 0 };
      floorDevices.map(device =>
        byDevice[device][id].isCheckedOff
          ? (progressTable[floor].checkedOff++, progressTable.totalCheckedOff++)
          : (progressTable[floor].active++, progressTable.totalActive++)
      );
    }

    return progressTable;
  }
);

export const selectSortedAreasAndDevices = createSelector(
  [
    state => state.tasker.entities[state.tasker.activeItem],
    selectActiveSortingOrder,
    state => state.tasker.byDevice,
    state => state.devices.byArea,
    state => state.devices.entities
  ],
  (activeItem, sortVals, byDevice, byArea, deviceEnts) => {
    const { id } = activeItem;
    let devices = activeItem.devices;
    const res = { areas: [], devicesByArea: {} };
    if (!devices || devices.length === 0) {
      return res;
    }

    res.areas = [...new Set(devices.map(device => deviceEnts[device].area))];
    for (const area of res.areas) {
      res.devicesByArea[area] = devices.filter(device =>
        byArea[area].includes(device)
      );
    }

    console.log(res);
    return res;
  }
);

// Auth
export const selectIsAuthenticated = state => state.authState.isAuthenticated;
