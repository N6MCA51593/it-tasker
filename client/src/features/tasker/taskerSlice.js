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
        taskerAdapter.addOne(state, payload);
        state.activeItem = payload.id;
        state.isEditing = true;
      },
      prepare({ deviceId = null, deviceFloor = null, type }) {
        const id = nanoid();
        const createdAt = new Date().toISOString();
        const lastEdited = createdAt;
        const devices = deviceId ? [deviceId] : [];
        const floors = deviceFloor ? [deviceFloor] : [];
        const name = 'New ' + type;
        return {
          payload: { id, type, name, devices, floors, createdAt, lastEdited }
        };
      }
    }
  }
});

export const { addItem } = taskerSlice.actions;

export default taskerSlice.reducer;
