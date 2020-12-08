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
  PC_DT
} from 'app/constants';

const initialState = {
  activeGlobalState: MAIN_GLOB,
  activeGeometryState: NAV_GEO,
  isLoading: true,
  isHoveringOverDevicePopUp: false,
  taskSortingOrder: CREATED_AT_ASC,
  noteSortingOrder: CREATED_AT_ASC,
  collectionSortingOrder: CREATED_AT_ASC,
  activeDeviceFilters: {
    [PC_DT]: true,
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
      const { value, type } = payload;
      if (type === TASK_TT) {
        state.taskSortingOrder = value;
      } else if (type === NOTE_TT) {
        state.noteSortingOrder = value;
      } else if (type === COLLECTION_TT) {
        state.collectionSortingOrder = value;
      }
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
    },
    'devices/setActiveDevice': state => {
      state.isHoveringOverDevicePopUp = false;
    },
    'devices/updateActiveDevice': state => {
      state.isHoveringOverDevicePopUp = false;
    },
    'api/updateTaskerItem/fulfilled': state => {
      if (state.activeGlobalState === EDIT_TASKER_ITEMS_GLOB) {
        state.activeGlobalState = VIEW_TASKER_ITEMS_GLOB;
      }
    },
    'tasker/cancelChanges': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'tasker/toggleActiveItem': state => {
      state.activeGlobalState === VIEW_TASKER_ITEMS_GLOB
        ? (state.activeGlobalState = MAIN_GLOB)
        : (state.activeGlobalState = VIEW_TASKER_ITEMS_GLOB);
    },
    'tasker/setActiveItemType': state => {
      state.activeGlobalState = MAIN_GLOB;
    },
    'tasker/toggleEditing': state => {
      state.activeGlobalState === VIEW_TASKER_ITEMS_GLOB
        ? (state.activeGlobalState = EDIT_TASKER_ITEMS_GLOB)
        : (state.activeGlobalState = VIEW_TASKER_ITEMS_GLOB);
    }
  }
});

export const {
  setUiGlobalState,
  setUiGeoState,
  setDeviceHoverStatus,
  setTaskerSortingOrder
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
