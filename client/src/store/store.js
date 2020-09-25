import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from './wallSlice';

export default configureStore({
  reducer: { walls: wallsReducer }
});
