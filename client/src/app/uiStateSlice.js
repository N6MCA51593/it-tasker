import { createSlice } from '@reduxjs/toolkit';
import { navGeo, editAreasGlob, mainGlob } from 'common/uiStates';

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
    'loadAppData/fulfilled': state => {
      state.isLoading = false;
    },
    'walls/updateWalls/fulfilled': state => {
      state.activeGlobalState = mainGlob;
      state.activeGeometryState = navGeo;
    }
  }
});

export const { setUiGlobalState, setUiGeoState } = uiStateSlice.actions;

export default uiStateSlice.reducer;
