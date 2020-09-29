import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const wallsAdapter = createEntityAdapter();
const initialState = wallsAdapter.getInitialState({
  activeWall: null,
  movingWallCoords: null
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
      prepare(coords) {
        const id = nanoid();
        return {
          payload: { id, coords }
        };
      }
    },
    saveWall(state, { payload }) {
      wallsAdapter.updateOne(state, {
        id: state.activeWall,
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
    removeWall: wallsAdapter.removeOne
  }
});

export const {
  addWall,
  updateActiveWall,
  removeWall,
  saveWall,
  moveWall
} = wallsSlice.actions;

export default wallsSlice.reducer;
