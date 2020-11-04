import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const floorAdapter = createEntityAdapter();
const initialState = floorAdapter.getInitialState({
  activeFloor: null
});

const floorsSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {
    setActiveFloor(state, { payload }) {
      state.activeFloor = payload;
    }
  },
  extraReducers: {
    'api/loadAppData/fulfilled': (state, { payload }) => {
      floorAdapter.addMany(state, payload.floors);
      state.activeFloor = '1IELCN-gENaKaAg20_nP8';
    },
    'api/updateGeometry/fulfilled': (state, { payload }) => {
      floorAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          geometry: payload.geometry
        }
      });
      state.activeFloor = payload.id;
    }
  }
});

export const { setActiveFloor } = floorsSlice.actions;

export default floorsSlice.reducer;
