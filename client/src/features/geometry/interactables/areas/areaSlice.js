import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';
import { polygonCentroid } from 'features/geometry/geometryMathFuncs';
import { editInteractablesGlob } from 'common/uiStates';

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
      const { name, id } = payload;
      state.toUpsert.push(id);
      state.entities[id].name = name;
    },
    removeArea(state, { payload }) {
      if (state.toUpsert.includes(payload)) {
        state.toUpsert = state.toUpsert.filter(e => e !== payload);
      } else {
        state.toDelete.push(payload);
      }
      areasAdapter.removeOne(state, payload);
    },
    saveArea(state, { payload }) {
      if (state.activeArea) {
        const area = state.entities[state.activeArea];
        area.points.pop();
        area.labelCoords = polygonCentroid(area.points);
        if (area.points.length < 3) {
          areasAdapter.removeOne(state, state.activeArea);
        } else {
          state.toUpsert.push(area.id);
        }
        state.activeArea = null;
      }
      if (state.activeLabel) {
        const id = state.activeLabel;
        state.entities[id].labelCoords = payload;
        state.toUpsert.push(id);
        state.activeLabel = null;
      }
    },
    cancelChanges(state) {
      if (state.areasHistory) {
        areasAdapter.setAll(state, state.areasHistory);
        state.activeArea = null;
        state.activeLabel = null;
        state.toRedraw = null;
        state.toDelete = [];
        state.toUpsert = [];
      }
    }
  },
  extraReducers: {
    'api/updateInteractables/fulfilled': state => {
      state.toDelete = [];
      state.toUpsert = [];
      state.areasHistory = null;
    },
    'api/loadAppData/fulfilled': (state, { payload }) => {
      areasAdapter.addMany(state, payload.areas);
    },
    'uiState/setUiGlobalState': (state, { payload }) => {
      if (payload === editInteractablesGlob && !state.areasHistory) {
        state.areasHistory = state.entities;
      } else if (state.areasHistory) {
        areasAdapter.setAll(state, state.areasHistory);
        state.areasHistory = null;
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
  renameLabel,
  cancelChanges
} = areasSlice.actions;

export default areasSlice.reducer;
