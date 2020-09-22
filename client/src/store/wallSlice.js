import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const wallsAdapter = createEntityAdapter();
const initialState = wallsAdapter.getInitialState();

const wallsSlice = createSlice({
  name: 'walls',
  initialState,
  reducers: {
    add: {
      reducer: wallsAdapter.addOne,
      prepare: coords => {
        const id = nanoid();
        return { payload: { id, coords } };
      }
    }
  }
});

export const { add } = wallsSlice.actions;

export default wallsSlice.reducer;
