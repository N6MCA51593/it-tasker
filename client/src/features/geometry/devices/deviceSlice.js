import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const devicesAdapter = createEntityAdapter();
const initialState = devicesAdapter.getInitialState({
  activeDevice: null,
  isMoving: false,
  devicesHistory: null
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
      if (state.activeDevice && state.isMoving && payload.area) {
        state.isMoving = false;
      }

      if (state.activeDevice && !state.isMoving) {
        state.activeDevice = null;
      }
    },
    setActiveDevice(state, { payload }) {
      if (payload) {
        state.activeDevice = payload;
      } else {
        state.activeDevice = null;
      }
    },
    removeDevice: devicesAdapter.removeOne,
    moveDevice(state, { payload }) {
      state.activeDevice = payload;
      state.isMoving = true;
    },
    setHistory(state) {
      state.devicesHistory = state.entities;
    },
    undo(state) {
      devicesAdapter.setAll(state, state.devicesHistory);
    }
  }
});

export const {
  addDevice,
  updateActiveDevice,
  setActiveDevice,
  removeDevice,
  moveDevice,
  setHistory,
  undo
} = devicesSlice.actions;

export default devicesSlice.reducer;
