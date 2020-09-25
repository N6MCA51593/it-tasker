import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const wallsAdapter = createEntityAdapter();
const initialState = wallsAdapter.getInitialState({
  activeWall: null,
  mode: 'draw'
});

const wallsSlice = createSlice({
  name: 'walls',
  initialState,
  reducers: {
    addWall: {
      reducer(state, { payload }) {
        console.log(payload);
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
    finalizeWall(state, { payload }) {
      console.log(state.entities);
      wallsAdapter.updateOne(state, {
        id: state.activeWall,
        changes: {
          coords: { ...payload, ...state.entities[state.activeWall].coords }
        }
      });
      state.activeWall = null;
    },
    setModeR(state, action) {
      state.mode = action.payload;
    },
    updateWallR: wallsAdapter.updateOne,
    removeWall: wallsAdapter.removeOne
  }
});

export const {
  addWall,
  setModeR,
  updateWallR,
  removeWall,
  finalizeWall
} = wallsSlice.actions;

export default wallsSlice.reducer;
