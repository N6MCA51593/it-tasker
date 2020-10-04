import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const areasAdapter = createEntityAdapter();
const initialState = areasAdapter.getInitialState({
  activeArea: null,
  mode: 'draw'
});

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    addArea: {
      reducer(state, { payload }) {
        const { point } = payload;
        if (state.activeArea) {
          state.entities[state.activeArea].points.splice(
            state.entities[state.activeArea].points.length - 1,
            1,
            point,
            point
          );
        } else {
          payload.points = [point, point];
          areasAdapter.addOne(state, payload);
          state.activeArea = payload.id;
        }
      },
      prepare(point) {
        const id = nanoid();
        return {
          payload: { id, point }
        };
      }
    },
    updateActiveArea(state, { payload }) {
      state.entities[state.activeArea].points[
        state.entities[state.activeArea].points.length - 1
      ] = payload;
    },
    setMode(state, { payload }) {
      state.mode = payload;
    }
  }
});

export const { addArea, updateActiveArea } = areasSlice.actions;

export default areasSlice.reducer;
