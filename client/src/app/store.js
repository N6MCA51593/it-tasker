import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from 'features/geometry/walls/wallSlice';
import areasReducer from 'features/geometry/areas/areaSlice';
import devicesReducer from 'features/geometry/devices/deviceSlice';
import floorsReducer from '../features/geometry/floors/floorSlice';
import uiStateReducer from 'app/uiStateSlice';

export default configureStore({
  reducer: {
    walls: wallsReducer,
    areas: areasReducer,
    devices: devicesReducer,
    floors: floorsReducer,
    uiState: uiStateReducer
  }
});
