import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';

const notificationAdapter = createEntityAdapter();
const initialState = notificationAdapter.getInitialState({
  newNotification: null
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, { payload }) {
        notificationAdapter.addOne(state, payload);
        state.newNotification = payload.id;
      },
      prepare({ type, message }) {
        const id = nanoid();
        return {
          payload: {
            id,
            type,
            message
          }
        };
      }
    },
    removeNotification: notificationAdapter.removeOne
  }
});

export const {
  addNotification,
  removeNotification
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
