import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';
import { polygonCentroid } from 'features/geometry/geometryMathFuncs';

const areasAdapter = createEntityAdapter();
const initialState = areasAdapter.getInitialState({
  activeArea: null,
  toRedraw: null,
  activeLabel: false,
  toUpsert: [],
  toDelete: [],
  areasHistory: null
});

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    addArea: {
      reducer(state, { payload }) {
        const { point, floor } = payload;
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
              floor,
              name: payload.name
            });
            state.activeArea = payload.id;
          }
        }
      },
      prepare({ point, floor }) {
        const id = nanoid();
        return {
          payload: { id, point, floor, name: 'New Area' }
        };
      }
    },
    updateActiveArea(state, { payload }) {
      if (state.activeArea) {
        state.entities[state.activeArea].points[
          state.entities[state.activeArea].points.length - 1
        ] = payload;
      } else if (state.activeLabel) {
        state.entities[state.activeLabel].labelCoords = payload;
      }
    },
    redrawArea(state, { payload }) {
      state.entities[payload].points = [];
      state.entities[payload].labelCoords = {};
      state.toRedraw = payload;
    },
    moveLabel(state, { payload }) {
      state.activeLabel = payload;
    },
    renameLabel(state, { payload }) {
      state.entities[payload.id].name = payload.name;
    },
    removeArea: areasAdapter.removeOne,
    saveArea(state, { payload }) {
      if (state.activeArea) {
        const area = state.entities[state.activeArea];
        area.points.pop();
        area.labelCoords = polygonCentroid(area.points);
        if (area.points.length < 3) {
          areasAdapter.removeOne(state, state.activeArea);
        }
        state.activeArea = null;
      }
      if (state.activeLabel) {
        state.entities[state.activeLabel].labelCoords = payload;
        state.activeLabel = null;
      }
    }
  }
});

export const {
  addArea,
  updateActiveArea,
  saveArea,
  removeArea,
  redrawArea,
  moveLabel,
  renameLabel
} = areasSlice.actions;

export default areasSlice.reducer;
