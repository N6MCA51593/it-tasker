import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const areasAdapter = createEntityAdapter();
const initialState = areasAdapter.getInitialState({
  activeArea: null,
  toRedraw: null,
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
          let points = state.entities[state.activeArea].points;
          points.splice(points.length - 1, 1, point, point);
        } else {
          const points = [point, point];
          if (state.toRedraw) {
            state.activeArea = state.toRedraw;
            state.entities[state.toRedraw].points = points;
            state.toRedraw = null;
          } else {
            areasAdapter.addOne(state, {
              id: payload.id,
              points,
              name: `Area ${state.ids.length + 1}`
            });
            state.activeArea = payload.id;
          }
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
    redrawArea(state, { payload }) {
      state.entities[payload].points = [];
      state.toRedraw = payload;
    },
    removeArea: areasAdapter.removeOne,
    saveArea(state) {
      state.entities[state.activeArea].points.pop();
      state.activeArea = null;
    }
  }
});

export const {
  setMode,
  addArea,
  updateActiveArea,
  saveArea,
  removeArea,
  redrawArea
} = areasSlice.actions;

export default areasSlice.reducer;
