import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const devicesAdapter = createEntityAdapter();
const initialState = devicesAdapter.getInitialState({
  activeDevice: null
});

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: {
      reducer(state, { payload }) {
        devicesAdapter.addOne(state, payload);
        state.activeDevice = payload.id;
      },
      prepare(payload) {
        const id = nanoid();
        return {
          payload: { id, area: payload.id, coords: payload.coords }
        };
      }
    }
  }
});

export const { addDevice } = devicesSlice.actions;

export default devicesSlice.reducer;
