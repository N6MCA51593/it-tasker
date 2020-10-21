import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const floorAdapter = createEntityAdapter();
const initialState = floorAdapter.getInitialState({
  uiState: 'main',
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
        }
      },
      prepare() {
        const floors = [nanoid(), nanoid(), nanoid()].map((e, i) => {
          return {
            id: e,
            name: `Floor ${i + 1}`,
            devices: [],
            areas: [],
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
