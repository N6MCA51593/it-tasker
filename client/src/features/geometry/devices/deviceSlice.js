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
          payload: {
            id,
            area: payload.id,
            coords: payload.coords,
            name: 'New Device',
            type: 'PC',
            description: '',
            status: 'ok'
          }
        };
      }
    },
    updateActiveDevice(state, { payload }) {
      devicesAdapter.updateOne(state, {
        id: state.activeDevice,
        changes: {
          ...payload
        }
      });
      if (state.activeDevice) {
        state.activeDevice = null;
      }
    },
    setActiveDevice(state, { payload }) {
      if (payload) {
        state.activeDevice = payload;
      } else {
        state.activeDevice = null;
      }
    }
  }
});

export const {
  addDevice,
  updateActiveDevice,
  setActiveDevice
} = devicesSlice.actions;

export default devicesSlice.reducer;
