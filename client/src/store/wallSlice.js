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
    add: {
      reducer(state, { payload }) {
        wallsAdapter.addOne(state, payload);
        if (payload.isActive) {
          state.activeWall = payload.id;
        }
      },
      prepare({ coords, isActive }) {
        const id = nanoid();
        return {
          payload: { id, coords, isActive: isActive ? isActive : false }
        };
      }
    },
    setModeR(state, action) {
      state.mode = action.payload;
    }
  }
});

export const { add, setModeR } = wallsSlice.actions;

export default wallsSlice.reducer;
