import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const devicesAdapter = createEntityAdapter();
const initialState = devicesAdapter.getInitialState({});

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: {
      reducer(state, { payload }) {
        const { x, y } = payload.coords;
        devicesAdapter.addOne(state, payload);
      },
      prepare(coords) {
        const id = nanoid();
        return {
          payload: { id, coords }
        };
      }
    }
  }
});

export const { addDevice } = devicesSlice.actions;

export default devicesSlice.reducer;
