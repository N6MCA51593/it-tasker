import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from 'features/geometry/wallSlice';
import areasReducer from 'features/geometry/areaSlice';
import devicesReducer from 'features/geometry/deviceSlice';

export default configureStore({
  reducer: { walls: wallsReducer, areas: areasReducer, devices: devicesReducer }
});
