import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from './wallSlice';
import activeWallReducer from './activeWallSlice';

export default configureStore({
  reducer: { walls: wallsReducer, activeWall: activeWallReducer }
});
