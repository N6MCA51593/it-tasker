import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';
import { EDIT_INTERACTABLES_GLOB } from 'app/constants';

const devicesAdapter = createEntityAdapter();
const initialState = devicesAdapter.getInitialState({
  activeDevice: null,
  isMoving: false,
  devicesHistory: null,
  toUpsert: [],
  toDelete: [],
  byArea: {}
});

const buildByAreas = state => {
  state.byArea = {};
  for (let i = 0, l = state.ids.length; i < l; i++) {
    const id = state.ids[i];
    const device = state.entities[id];
    if (!state.byArea[device.area]) {
      state.byArea[device.area] = [];
    }

    state.byArea[device.area].push(id);
  }
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: {
      reducer(state, { payload }) {
        state.toUpsert.push(payload.id);
        devicesAdapter.addOne(state, payload);
        state.activeDevice = payload.id;
      },
      prepare(payload) {
        const id = nanoid();
        return {
          payload: {
            id,
            floor: payload.floor,
            area: payload.id,
            x: payload.x,
            y: payload.y,
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
        state.toUpsert.push(state.activeDevice);
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
    removeDevice(state, { payload }) {
      if (state.toUpsert.includes(payload)) {
        state.toUpsert = state.toUpsert.filter(e => e !== payload);
      } else {
        state.toDelete.push(payload);
      }
      devicesAdapter.removeOne(state, payload);
    },
    moveDevice(state, { payload }) {
      state.activeDevice = payload;
      state.isMoving = true;
    }
  },
  extraReducers: {
    'areas/removeArea': (state, { payload }) => {
      const toRemove = Object.keys(state.entities).filter(
        key => state.entities[key].area === payload
      );
      state.toUpsert = state.toUpsert.filter(e => !toRemove.includes(e));
      devicesAdapter.removeMany(state, toRemove);
    },
    'areas/cancelChanges': state => {
      devicesAdapter.setAll(state, state.devicesHistory);
      state.activeDevice = null;
      state.isMoving = null;
      state.toDelete = [];
      state.toUpsert = [];
    },
    'floors/setActiveFloor': state => {
      state.activeDevice = null;
    },
    'tasker/toggleActiveItem': state => {
      state.activeDevice = null;
    },
    'tasker/addItem': state => {
      state.activeDevice = null;
    },
    'api/updateInteractables/fulfilled': (state, { payload }) => {
      state.toDelete = [];
      state.toUpsert = [];
      state.devicesHistory = null;
      if (payload) {
        buildByAreas(state);
      }
    },
    'api/loadAppData/fulfilled': (state, { payload }) => {
      devicesAdapter.addMany(state, payload.devices);
      buildByAreas(state);
    },
    'api/removeFloor/fulfilled': (state, { payload }) => {
      devicesAdapter.setAll(state, payload.devices);
      buildByAreas(state);
    },
    'uiState/setUiGlobalState': (state, { payload }) => {
      state.activeDevice = null;
      if (payload === EDIT_INTERACTABLES_GLOB && !state.devicesHistory) {
        state.devicesHistory = state.entities;
      } else if (state.devicesHistory) {
        devicesAdapter.setAll(state, state.devicesHistory); // temp
        state.devicesHistory = null;
      }
    },
    'authState/resetState': () => {
      return initialState;
    }
  }
});

export const {
  addDevice,
  updateActiveDevice,
  setActiveDevice,
  removeDevice,
  moveDevice
} = devicesSlice.actions;

export default devicesSlice.reducer;
