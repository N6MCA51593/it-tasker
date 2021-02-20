import { createSlice } from '@reduxjs/toolkit';
import {
  NAV_GEO,
  MAIN_GLOB,
  EDIT_TASKER_ITEMS_GLOB,
  VIEW_TASKER_ITEMS_GLOB,
  TASK_TT,
  NOTE_TT,
  COLLECTION_TT,
  CREATED_AT_ASC,
  OTHER_DT,
  PC_DT,
  LAPTOP_DT,
  PRINTER_DT,
  PHONE_DT,
  SOUND_DT,
  SCREEN_DT,
  NETWORK_DT,
  SERVER_DT,
  ADD_AREA_GEO,
  CREATED_AT_DESC
} from 'app/constants';

const initialState = {
  isLoading: true,
  activeGlobalState: MAIN_GLOB,
  activeGeometryState: NAV_GEO,
  isTaskerContainerVisibleMobile: false,
  isHoveringOverDevicePopUp: false, // Prevents panning on <foreignObject>
  zoomLvl: 1.1,
  panVLvl: 0,
  panHLvl: 0,
  taskSortingOrder: CREATED_AT_ASC,
  noteSortingOrder: CREATED_AT_ASC,
  collectionSortingOrder: CREATED_AT_ASC,
  taskAreaSortingOrder: CREATED_AT_DESC,
  noteAreaSortingOrder: CREATED_AT_DESC,
  collectionAreaSortingOrder: CREATED_AT_DESC,
  taskDeviceSortingOrder: CREATED_AT_DESC,
  noteDeviceSortingOrder: CREATED_AT_DESC,
  collectionDeviceSortingOrder: CREATED_AT_DESC,
  isCheckedOffTaskFilter: null,
  isCheckedOffNoteFilter: null,
  activeDeviceFilters: {
    [PC_DT]: true,
    [LAPTOP_DT]: true,
    [PHONE_DT]: true,
    [PRINTER_DT]: true,
    [SOUND_DT]: true,
    [SCREEN_DT]: true,
    [NETWORK_DT]: true,
    [SERVER_DT]: true,
    [OTHER_DT]: true
  }
};

const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setUiGlobalState(state, { payload }) {
      state.activeGlobalState = payload;
    },
    setUiGeoState(state, { payload }) {
      state.activeGeometryState = payload;
    },
    setDeviceHoverStatus(state, { payload }) {
      if (payload) {
        state.isHoveringOverDevicePopUp = payload;
      } else {
        state.isHoveringOverDevicePopUp = !state.isHoveringOverDevicePopUp;
      }
    },
    setTaskerSortingOrder(state, { payload }) {
      const { value, type, interactableType } = payload;
      if (type === TASK_TT) {
        interactableType
          ? interactableType === 'device'
            ? (state.taskDeviceSortingOrder = value)
            : (state.taskAreaSortingOrder = value)
          : (state.taskSortingOrder = value);
      } else if (type === NOTE_TT) {
        interactableType
          ? interactableType === 'device'
            ? (state.noteDeviceSortingOrder = value)
            : (state.noteAreaSortingOrder = value)
          : (state.noteSortingOrder = value);
      } else if (type === COLLECTION_TT) {
        interactableType
          ? interactableType === 'device'
            ? (state.collectionDeviceSortingOrder = value)
            : (state.collectionAreaSortingOrder = value)
          : (state.collectionSortingOrder = value);
      }
    },
    loadFromLocalStorage(state, { payload }) {
      for (const value in payload) {
        if (typeof payload[value] === 'object' && payload[value]) {
          for (const objValue in payload[value]) {
            state[value][objValue] = payload[value][objValue];
          }
        } else {
          state[value] = payload[value];
        }
      }
    },
    setTaskFilter(state, { payload }) {
      state.isCheckedOffTaskFilter = payload;
    },
    setNoteFilter(state, { payload }) {
      state.isCheckedOffNoteFilter = payload;
    },
    toggleDeviceFilter(state, { payload }) {
      state.activeDeviceFilters[payload] = !state.activeDeviceFilters[payload];
    },
    setTaskerContainerMobile(state) {
      state.isTaskerContainerVisibleMobile = !state.isTaskerContainerVisibleMobile;
    }
  },
  extraReducers: {
    'api/loadAppData/fulfilled': state => {
      state.isLoading = false;
    },
    'api/updateGeometry/fulfilled': state => {
      state.activeGlobalState = MAIN_GLOB;
      state.activeGeometryState = NAV_GEO;
    },
    'api/updateInteractables/fulfilled': state => {
      state.activeGlobalState = MAIN_GLOB;
      state.activeGeometryState = NAV_GEO;
    },
    'tasker/addItem': state => {
      state.activeGlobalState = EDIT_TASKER_ITEMS_GLOB;
      state.isHoveringOverDevicePopUp = false;
    },
    'devices/setActiveDevice': state => {
      state.isHoveringOverDevicePopUp = false;
    },
    'devices/updateActiveDevice': state => {
      state.isHoveringOverDevicePopUp = false;
    },
    'areas/redrawArea': state => {
      state.activeGeometryState = ADD_AREA_GEO;
    },
    'api/updateTaskerItem/fulfilled': state => {
      if (state.activeGlobalState === EDIT_TASKER_ITEMS_GLOB) {
        state.activeGlobalState = VIEW_TASKER_ITEMS_GLOB;
      }
    },
    'api/checkOffTaskerItem/fulfilled': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'api/removeTaskerItem/fulfilled': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'tasker/cancelChanges': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'walls/cancelChanges': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'areas/cancelChanges': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'tasker/toggleActiveItem': state => {
      state.activeGlobalState === VIEW_TASKER_ITEMS_GLOB
        ? (state.activeGlobalState = MAIN_GLOB)
        : (state.activeGlobalState = VIEW_TASKER_ITEMS_GLOB);
      state.isHoveringOverDevicePopUp = false;
    },
    'tasker/setActiveItemType': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'tasker/toggleEditing': state => {
      state.activeGlobalState === VIEW_TASKER_ITEMS_GLOB
        ? (state.activeGlobalState = EDIT_TASKER_ITEMS_GLOB)
        : (state.activeGlobalState = VIEW_TASKER_ITEMS_GLOB);
    },
    'authState/resetState': () => {
      return initialState;
    }
  }
});

export const {
  setUiGlobalState,
  setUiGeoState,
  setDeviceHoverStatus,
  setTaskerSortingOrder,
  setNoteFilter,
  setTaskFilter,
  loadFromLocalStorage,
  toggleDeviceFilter,
  setTaskerContainerMobile
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
