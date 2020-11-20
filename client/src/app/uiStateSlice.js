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
  isLoading: true
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
    'api/updateTaskerItem/fulfilled': state => {
      if (state.activeGlobalState === editTaskerItemGlob) {
        state.activeGlobalState = viewTaskerItemGlob;
      }
    },
    'tasker/cancelChanges': state => {
      state.activeGlobalState = mainGlob;
    },
    'tasker/setActiveItem': state => {
      state.activeGlobalState = viewTaskerItemGlob;
    },
    'tasker/toggleEditing': state => {
      state.activeGlobalState === viewTaskerItemGlob
        ? (state.activeGlobalState = editTaskerItemGlob)
        : (state.activeGlobalState = viewTaskerItemGlob);
    }
  }
});

export const { setUiGlobalState, setUiGeoState } = uiStateSlice.actions;

export default uiStateSlice.reducer;
