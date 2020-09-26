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
      wallsAdapter.updateOne(state, {
        id: state.activeWall,
        changes: {
          coords: { ...state.entities[state.activeWall].coords, ...payload }
        }
      });
      state.activeWall = null;
    },
    updateWall: wallsAdapter.updateOne,
    removeWall: wallsAdapter.removeOne
  }
});

export const {
  addWall,
  updateWall,
  removeWall,
  finalizeWall
} = wallsSlice.actions;

export default wallsSlice.reducer;
