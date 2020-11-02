import {
  createSlice,
  nanoid,
  createEntityAdapter,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { editGeomGlob } from 'common/uiStates';

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

const reqParamsBuilder = toDelete => {
  const reducer = (accum, cv, ci, arr) => {
    return ci === arr.length - 1 ? accum + cv : accum + cv + '&del=';
  };

  const delQuery =
    toDelete.length > 0 ? toDelete.reduce(reducer, '?del=') : '?';
  return delQuery;
};

export const updateWallsReq = createAsyncThunk(
  'walls/updateWalls',
  async (_, { getState }) => {
    const currState = getState();
    const floor = currState.floors.activeFloor;
    const params = reqParamsBuilder(currState.walls.toDelete) + '&fl=' + floor;

    // Remove duplicates
    const body = [...new Set(currState.walls.toUpsert)].map(
      e => currState.walls.entities[e]
    );

    const response = await fetch(
      'http://localhost:5000/api/update/geometry' + params,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );
    const res = await response.json();
    return res;
  }
);

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
        state.toDelete.push(payload);
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
    [updateWallsReq.fulfilled]: state => {
      state.toDelete = [];
      state.toUpsert = [];
      state.wallsHistory = null;
    },
    'loadAppData/fulfilled': (state, { payload }) => {
      wallsAdapter.addMany(state, payload.walls);
    },
    'uiState/setUiGlobalState': (state, { payload }) => {
      if (payload === editGeomGlob && !state.wallsHistory) {
        state.wallsHistory = state.entities;
      } else if (state.wallsHistory) {
        wallsAdapter.setAll(state, state.wallsHistory);
        state.wallsHistory = null;
      }
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
  cancelChanges
} = wallsSlice.actions;

export default wallsSlice.reducer;
