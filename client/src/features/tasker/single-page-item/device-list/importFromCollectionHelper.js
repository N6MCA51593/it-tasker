import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleDevice } from 'features/tasker/taskerSlice';

export const importFromCollectionHelper = createAsyncThunk(
  'tasker/importFromCollectionHelper',
  (payload, { dispatch, getState }) => {
    const state = getState();

    const collection = state.tasker.entities[payload];
    const activeItem = state.tasker.entities[state.tasker.activeItem];

    const collectionDevices = collection.devices ? collection.devices : [];
    const activeItemDevices = new Set(activeItem.devices);

    const devicesToAdd = [...collectionDevices].filter(
      id => !activeItemDevices.has(id)
    );
    const toAdd = devicesToAdd.map(id => {
      return { id, floor: state.devices.entities[id].floor };
    });
    dispatch(toggleDevice(toAdd));
  }
);
