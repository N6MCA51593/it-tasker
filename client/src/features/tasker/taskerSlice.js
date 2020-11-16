import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const taskerAdapter = createEntityAdapter();
const initialState = taskerAdapter.getInitialState({
  activeItem: null,
  isEditing: false,
  isLoading: false,
  taskerHistory: null,
  byDevice: {}
});

const taskerSlice = createSlice({
  name: 'tasker',
  initialState,
  reducers: {
    addItem: {
      reducer(state, { payload }) {
        const id = payload.id;
        const deviceId = payload.devices[0];
        taskerAdapter.addOne(state, payload);
        if (deviceId) {
          if (!state.byDevice[deviceId]) {
            state.byDevice[deviceId] = {};
          }

          state.byDevice[deviceId][id] = {
            isCheckedOff: false
          };
        }
        state.activeItem = id;
        state.isEditing = true;
      },
      prepare({ deviceId = null, deviceFloor = null, type }) {
        const id = nanoid();
        const createdAt = new Date().toISOString();
        const lastEditedAt = createdAt;
        const devices = deviceId ? [deviceId] : [];
        const floors = deviceFloor ? [deviceFloor] : [];
        const name = 'New ' + type;
        return {
          payload: {
            id,
            type,
            name,
            devices,
            floors,
            createdAt,
            lastEditedAt,
            isNew: true
          }
        };
      }
    },
    toggleDevice(state, { payload }) {
      const { id: device, floor } = payload;
      if (state.byDevice[device]?.[state.activeItem]) {
        const deviceIndex = state.entities[state.activeItem].devices.indexOf(
          device
        );
        const floorIndex = state.entities[state.activeItem].floors.indexOf(
          floor
        );
        state.entities[state.activeItem].devices.splice(deviceIndex, 1);
        state.entities[state.activeItem].floors.splice(floorIndex, 1);
        delete state.byDevice[device][state.activeItem];
      } else {
        state.entities[state.activeItem].devices.push(device);
        state.entities[state.activeItem].floors.push(floor);
        if (!state.byDevice[device]) {
          state.byDevice[device] = {};
        }
        state.byDevice[device][state.activeItem] = { isCheckedOff: false };
      }
    },
    cancelChanges(state) {
      const activeItem = state.entities[state.activeItem];
      if (activeItem.isNew) {
        for (let i = 0, l = activeItem.devices.length; i < l; i++) {
          delete state.byDevice[activeItem.devices[i]];
        }

        taskerAdapter.removeOne(state, state.activeItem);
        state.activeItem = null;
      } else {
      }
      state.isEditing = false;
    },
    saveChanges(state, { payload }) {
      taskerAdapter.updateOne(state, {
        id: state.activeItem,
        changes: { ...payload }
      });
    }
  }
});

export const {
  addItem,
  toggleDevice,
  cancelChanges,
  saveChanges
} = taskerSlice.actions;

export default taskerSlice.reducer;
