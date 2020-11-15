import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const taskerAdapter = createEntityAdapter();
const initialState = taskerAdapter.getInitialState({
  activeItem: null,
  isEditing: false,
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
        const indexDevice = state.entities[state.activeItem].devices.indexOf(
          device
        );
        const indexFloor = state.entities[state.activeItem].floors.indexOf(
          floor
        );
        state.entities[state.activeItem].devices.splice(indexDevice, 1);
        state.entities[state.activeItem].floors.splice(indexFloor, 1);
        delete state.byDevice[device][state.activeItem];
      } else {
        state.entities[state.activeItem].devices.push(device);
        state.entities[state.activeItem].floors.push(floor);
        if (!state.byDevice[device]) {
          state.byDevice[device] = {};
        }
        state.byDevice[device][state.activeItem] = { isCheckedOff: false };
      }
    }
  }
});

export const { addItem, toggleDevice } = taskerSlice.actions;

export default taskerSlice.reducer;
