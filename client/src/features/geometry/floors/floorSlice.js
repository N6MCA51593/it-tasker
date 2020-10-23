import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const floorAdapter = createEntityAdapter();
const initialState = floorAdapter.getInitialState({
  activeFloor: null
});

const floorsSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {
    generateFloors: {
      reducer(state, { payload }) {
        if (state.ids.length === 0) {
          floorAdapter.addMany(state, payload);
          state.activeFloor = state.ids[0];
        }
      },
      prepare() {
        const floors = [nanoid(), nanoid(), nanoid()].map((e, i) => {
          return {
            id: e,
            name: `Floor ${i + 1}`,
            geometry: null
          };
        });
        return { payload: floors };
      }
    }
  }
});

export const { generateFloors } = floorsSlice.actions;

export default floorsSlice.reducer;
