import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';
import { EDIT_GEOM_GLOB } from 'app/constants';
import { shallowEqual } from 'react-redux';

const wallsAdapter = createEntityAdapter();
const initialState = wallsAdapter.getInitialState({
  activeWall: null,
  movingWallCoords: null,
  toDelete: [],
  toUpsert: [],
  wallsHistory: null
});

const getCoords = (state, { x, y }) => {
  let res = {};
  if (state.movingWallCoords) {
    res.x1 = state.movingWallCoords.x1 ? state.movingWallCoords.x1 : x;
    res.y1 = state.movingWallCoords.y1 ? state.movingWallCoords.y1 : y;
    res.x2 = state.movingWallCoords.x2 ? state.movingWallCoords.x2 : x;
    res.y2 = state.movingWallCoords.y2 ? state.movingWallCoords.y2 : y;
  } else {
    res = { ...state.entities[state.activeWall].coords, x2: x, y2: y };
  }
  return res;
};

const wallsSlice = createSlice({
  name: 'walls',
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
      prepare({ coords, floor }) {
        const id = nanoid();
        return {
          payload: { id, coords, floor }
        };
      }
    },
    importFromFloor: {
      reducer(state, { payload }) {
        const { toImport } = payload;
        const parentChild = state.ids.reduce((acc, id) => {
          const wall = state.entities[id];
          if (wall.floor === toImport[0].floor && wall.parentId) {
            return { ...acc, [wall.parentId]: id };
          } else {
            return acc;
          }
        }, {});
        for (const newWall of toImport) {
          const { coords, parentId, id } = newWall;
          if (parentChild[parentId]) {
            const oldWall = state.entities[parentChild[parentId]];
            if (!shallowEqual(oldWall.coords, coords)) {
              state.entities[parentChild[parentId]].coords = coords;
              state.toUpsert.push(oldWall.id);
            }
          } else {
            wallsAdapter.addOne(state, newWall);
            state.toUpsert.push(id);
          }
        }
      },
      prepare({ payload }) {
        const { walls, newFloor } = payload;
        const toImport = walls.map(wall => {
          return { ...wall, parentId: wall.id, floor: newFloor, id: nanoid() };
        });
        return {
          payload: { toImport }
        };
      }
    },
    saveWall(state, { payload }) {
      const id = state.activeWall;
      state.toUpsert.push(id);
      wallsAdapter.updateOne(state, {
        id,
        changes: {
          coords: getCoords(state, payload)
        }
      });
      state.activeWall = null;
      state.movingWallCoords = null;
    },
    updateActiveWall(state, { payload }) {
      wallsAdapter.updateOne(state, {
        id: state.activeWall,
        changes: {
          coords: getCoords(state, payload)
        }
      });
    },
    moveWall(state, { payload }) {
      state.activeWall = payload.id;
      state.movingWallCoords = payload.coords;
    },
    removeWall(state, { payload }) {
      if (state.toUpsert.includes(payload)) {
        state.toUpsert = state.toUpsert.filter(e => e !== payload);
      } else {
        state.toDelete.push({
          id: payload,
          floor: state.entities[payload].floor
        });
      }
      wallsAdapter.removeOne(state, payload);
    },
    cancelDrawing(state) {
      wallsAdapter.removeOne(state, state.activeWall);
      state.activeWall = null;
    },
    cancelChanges(state) {
      if (state.wallsHistory) {
        wallsAdapter.setAll(state, state.wallsHistory);
        state.activeWall = null;
        state.movingWallCoords = null;
        state.toDelete = [];
        state.toUpsert = [];
      }
    }
  },
  extraReducers: {
    'api/updateGeometry/fulfilled': state => {
      state.toDelete = [];
      state.toUpsert = [];
      state.wallsHistory = null;
    },
    'api/loadAppData/fulfilled': (state, { payload }) => {
      wallsAdapter.addMany(state, payload.walls);
    },
    'api/removeFloor/fulfilled': (state, { payload }) => {
      wallsAdapter.setAll(state, payload.walls);
    },
    'uiState/setUiGlobalState': (state, { payload }) => {
      if (payload === EDIT_GEOM_GLOB && !state.wallsHistory) {
        state.wallsHistory = state.entities;
      } else if (state.wallsHistory) {
        wallsAdapter.setAll(state, state.wallsHistory);
        state.wallsHistory = null;
        state.activeWall = null;
        state.movingWallCoords = null;
      }
    },
    'authState/resetState': () => {
      return initialState;
    }
  }
});

export const {
  addWall,
  updateActiveWall,
  removeWall,
  saveWall,
  moveWall,
  cancelDrawing,
  cancelChanges,
  importFromFloor
} = wallsSlice.actions;

export default wallsSlice.reducer;
