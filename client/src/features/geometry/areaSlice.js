import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const areaAdapter = createEntityAdapter();
const initialState = areaAdapter.getInitialState({
  activeArea: null
});

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    addWall: {
      reducer(state, { payload }) {
        const { x, y } = payload.coords;
        payload.coords = {
          x1: x,
          y1: y,
          x2: state.activeWall ? state.entities[state.activeWall].coords.x2 : x,
          y2: state.activeWall ? state.entities[state.activeWall].coords.y2 : y
        };
        wallsAdapter.addOne(state, payload);
        state.activeWall = payload.id;
      },
      prepare(coords) {
        const id = nanoid();
        return {
          payload: { id, coords }
        };
      }
    }
  }
});

export const {} = areasSlice.actions;

export default areasSlice.reducer;
