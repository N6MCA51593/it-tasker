import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from 'features/geometry/wallSlice';

export default configureStore({
  reducer: { walls: wallsReducer }
});
