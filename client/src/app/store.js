import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from 'features/geometry/walls/wallSlice';
import areasReducer from 'features/geometry/interactables/areas/areaSlice';
import devicesReducer from 'features/geometry/interactables/devices/deviceSlice';
import floorsReducer from '../features/geometry/floors/floorSlice';
import taskerReducer from '../features/tasker/taskerSlice';
import uiStateReducer from 'app/uiStateSlice';

export default configureStore({
  reducer: {
    walls: wallsReducer,
    areas: areasReducer,
    devices: devicesReducer,
    floors: floorsReducer,
    uiState: uiStateReducer,
    tasker: taskerReducer
  }
});
