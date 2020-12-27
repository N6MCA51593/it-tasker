import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetState } from 'features/auth/authStateSlice';

export const logout = createAsyncThunk(
  'api/logout',
  async (_, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors'
      });

      if (response.status >= 400 && response.status < 600) {
        throw new Error('Server Error');
      }

      dispatch(resetState());

      return;
    } catch (error) {
      throw new Error(error);
    }
  }
);
