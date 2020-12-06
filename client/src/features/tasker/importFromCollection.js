import { createAsyncThunk } from '@reduxjs/toolkit';

export const importFromCollectionHelper = createAsyncThunk(
  'tasker/importFromCollectionHelper',
  (payload, { dispatch, getState }) => {
    const state = getState();
    const collection = state.tasker.entities[payload];
  }
);
