import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const floorAdapter = createEntityAdapter();
const initialState = floorAdapter.getInitialState({
  activeFloor: null
});

const floorsSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {},
  extraReducers: {
    'loadAppData/fulfilled': (state, { payload }) => {
      floorAdapter.addMany(state, payload.floors);
      state.activeFloor = state.ids[0];
    }
  }
});

//export const {} = floorsSlice.actions;

export default floorsSlice.reducer;
