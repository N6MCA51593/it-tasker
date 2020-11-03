import { createSlice } from '@reduxjs/toolkit';
import { navGeo, mainGlob, editAreasGlob } from 'common/uiStates';

const initialState = {
  activeGlobalState: editAreasGlob,
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
    }
  }
});

export const { setUiGlobalState, setUiGeoState } = uiStateSlice.actions;

export default uiStateSlice.reducer;
