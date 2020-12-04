import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';

const floorAdapter = createEntityAdapter();
const initialState = floorAdapter.getInitialState({
  activeFloor: null,
  editingFloor: null
});

const floorsSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {
    setActiveFloor(state, { payload }) {
      state.activeFloor = payload;
    },
    addFloor: {
      reducer(state, { payload }) {
        const position =
          Math.max(...state.ids.map(id => state.entities[id].position)) + 1;
        floorAdapter.addOne(state, {
          id: payload,
          name: 'New Floor',
          geometry: null,
          shortName: 'F' + position,
          position,
          isNew: true
        });
        state.editingFloor = payload;
      },
      prepare() {
        const id = nanoid();
        return { payload: id };
      }
    },
    setEditingFloor(state, { payload }) {
      state.editingFloor = payload ? payload : null;
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
    },
    'api/updateFloor/fulfilled': (state, { payload }) => {
      const { id, updatedFloors } = payload;
      console.log(updatedFloors);
      for (const floor of updatedFloors) {
        if (floor.id === id) {
          state.entities[id].shortName = floor.shortName;
          state.entities[id].name = floor.name;
        }

        state.entities[floor.id].position = floor.position;
        state.editingFloor = null;
      }
    }
  }
});

export const {
  setActiveFloor,
  addFloor,
  setEditingFloor
} = floorsSlice.actions;

export default floorsSlice.reducer;
