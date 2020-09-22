import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const activeWallSlice = createSlice({
  name: 'activeWall',
  initialState,
  reducers: {
    setW(state, action) {
      return action.payload;
    }
  }
});

export const { setW } = activeWallSlice.actions;
export default activeWallSlice.reducer;
