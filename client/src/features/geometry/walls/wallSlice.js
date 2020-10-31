import {
  createSlice,
  nanoid,
  createEntityAdapter,
  createAsyncThunk
} from '@reduxjs/toolkit';

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

const reqParamsBuilder = (toUpsert, toDelete) => {
  const reducer = (accum, cv, ci, arr) => {
    if (arr.length === 0) {
      accum = '';
      return;
    }

    if (accum[0] === 'u') {
      return ci === arr.length - 1 ? accum + cv : accum + cv + '&upd=';
    } else {
      return ci === arr.length - 1 ? accum + cv : accum + cv + '&del=';
    }
  };

  const upsQuery =
    toUpsert.length > 0 ? toUpsert.reduce(reducer, 'upd=') + '&' : '';
  const delQuery = toDelete.length > 0 ? toDelete.reduce(reducer, 'del=') : '';

  const query = '?' + upsQuery + delQuery;

  return query;
};

export const updateWallsReq = createAsyncThunk(
  'walls/updateWalls',
  async (_, { dispatch, getState }) => {
    const currState = getState();
    const params = reqParamsBuilder(
      currState.walls.toUpsert,
      currState.walls.toDelete
    );

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
      if (!state.wallsHistory) {
        state.wallsHistory = state.entities;
      }

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
        state.toUpsert.filter(e => e === payload);
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
      }
    }
  },
  extraReducers: {
    [updateWallsReq.fulfilled]: state => {
      state.toDelete = [];
      state.toUpsert = [];
      state.wallsHistory = null;
    }
  }
});

export const {
  addWall,
  updateActiveWall,
  removeWall,
  saveWall,
  moveWall,
  cancelDrawing
} = wallsSlice.actions;

export default wallsSlice.reducer;
