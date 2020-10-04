import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from 'features/geometry/wallSlice';
import areasReducer from 'features/geometry/areaSlice';

export default configureStore({
  reducer: { walls: wallsReducer, areas: areasReducer }
});
