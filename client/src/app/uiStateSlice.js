import { createSlice } from '@reduxjs/toolkit';
import {
  navGeo,
  mainGlob,
  editTaskerItemGlob,
  viewTaskerItemGlob
} from 'common/uiStates';

const initialState = {
  activeGlobalState: mainGlob,
  activeGeometryState: navGeo,
  isLoading: true,
  isHoveringOverDevicePopUp: false
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
    }
  },
  extraReducers: {
    'api/loadAppData/fulfilled': state => {
      state.isLoading = false;
    },
    'api/updateGeometry/fulfilled': state => {
      state.activeGlobalState = mainGlob;
      state.activeGeometryState = navGeo;
    },
    'api/updateInteractables/fulfilled': state => {
      state.activeGlobalState = mainGlob;
      state.activeGeometryState = navGeo;
    },
    'tasker/addItem': state => {
      state.activeGlobalState = editTaskerItemGlob;
    },
    'devices/setActiveDevice': state => {
      state.isHoveringOverDevicePopUp = false;
    },
    'devices/updateActiveDevice': state => {
      state.isHoveringOverDevicePopUp = false;
    },
    'api/updateTaskerItem/fulfilled': state => {
      if (state.activeGlobalState === editTaskerItemGlob) {
        state.activeGlobalState = viewTaskerItemGlob;
      }
    },
    'tasker/cancelChanges': state => {
      state.activeGlobalState = mainGlob;
    },
    'tasker/toggleActiveItem': state => {
      state.activeGlobalState === viewTaskerItemGlob
        ? (state.activeGlobalState = mainGlob)
        : (state.activeGlobalState = viewTaskerItemGlob);
    },
    'tasker/setActiveItemType': state => {
      state.activeGlobalState = mainGlob;
    },
    'tasker/toggleEditing': state => {
      state.activeGlobalState === viewTaskerItemGlob
        ? (state.activeGlobalState = editTaskerItemGlob)
        : (state.activeGlobalState = viewTaskerItemGlob);
    }
  }
});

export const {
  setUiGlobalState,
  setUiGeoState,
  setDeviceHoverStatus
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
