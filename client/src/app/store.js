import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from 'features/geometry/walls/wallSlice';
import areasReducer from 'features/geometry/areas/areaSlice';
import devicesReducer from 'features/geometry/devices/deviceSlice';
import floorsReducer from './floorSlice';

export default configureStore({
  reducer: {
    walls: wallsReducer,
    areas: areasReducer,
    devices: devicesReducer,
    floors: floorsReducer
  }
});
