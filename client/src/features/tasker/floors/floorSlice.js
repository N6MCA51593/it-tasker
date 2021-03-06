import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';

const floorAdapter = createEntityAdapter();
const initialState = floorAdapter.getInitialState({
  activeFloor: null,
  editingFloor: null
});

const floorsSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {
    setActiveFloor(state, { payload }) {
      state.activeFloor = payload;
    },
    addFloor: {
      reducer(state, { payload }) {
        if (!state.editingFloor) {
          const position =
            Math.max(...state.ids.map(id => state.entities[id].position)) + 1;
          floorAdapter.addOne(state, {
            id: payload,
            name: 'New Level',
            geometry: null,
            shortName: 'L' + position,
            position,
            isNew: true
          });
          state.editingFloor = payload;
        }
      },
      prepare() {
        const id = nanoid();
        return { payload: id };
      }
    },
    setEditingFloor(state, { payload }) {
      if (state.editingFloor) {
        if (!state.entities[state.editingFloor].isNew) {
          state.editingFloor = payload ? payload : null;
        } else {
          const id = state.editingFloor;
          floorAdapter.removeOne(state, id);
          state.editingFloor = null;
        }
      } else {
        state.editingFloor = payload;
      }
    }
  },
  extraReducers: {
    'api/loadAppData/fulfilled': (state, { payload }) => {
      floorAdapter.addMany(state, payload.floors);
      state.activeFloor = state.entities[state?.activeFloor]
        ? state.activeFloor
        : state.ids[0];
    },
    'api/removeFloor/fulfilled': (state, { payload }) => {
      const { deletedFloorId } = payload;
      if (payload.floors) {
        for (const floor of payload.floors) {
          state.entities[floor.id].position = floor.position;
        }
      }

      state.editingFloor = null;
      const pos = state.entities[deletedFloorId].position;
      floorAdapter.removeOne(state, deletedFloorId);

      if (state.activeFloor === deletedFloorId) {
        const prev = Object.values(state.entities).find(
          floor => floor.position === pos - 1 || floor.position === pos
        ).id;
        state.activeFloor = prev;
      }
    },
    'api/updateGeometry/fulfilled': (state, { payload }) => {
      if (payload) {
        for (const floor of payload) {
          state.entities[floor.id].geometry = floor.geometry;
        }
      }
    },
    'api/updateFloor/fulfilled': (state, { payload }) => {
      const { id, updatedFloors } = payload;
      for (const floor of updatedFloors) {
        if (floor.id === id) {
          state.entities[id].shortName = floor.shortName;
          state.entities[id].name = floor.name;
          if (state.entities[id].isNew) {
            state.entities[id].isNew = undefined;
          }
        }

        state.entities[floor.id].position = floor.position;
        state.editingFloor = null;
      }
    },
    'uiState/loadFromLocalStorage': (state, { payload }) => {
      if (payload) {
        state.activeFloor = payload.activeFloor;
      }
    },
    'authState/resetState': () => {
      return initialState;
    }
  }
});

export const {
  setActiveFloor,
  addFloor,
  setEditingFloor
} = floorsSlice.actions;

export default floorsSlice.reducer;
