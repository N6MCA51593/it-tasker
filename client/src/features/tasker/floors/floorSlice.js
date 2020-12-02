import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';

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
      },
      prepare() {
        const id = nanoid();
        return { payload: id };
      }
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

export const { setActiveFloor, addFloor } = floorsSlice.actions;

export default floorsSlice.reducer;
