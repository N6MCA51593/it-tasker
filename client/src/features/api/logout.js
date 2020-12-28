import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';
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
      await handleResponseErrors(response, true, dispatch);
      dispatch(resetState());
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
);
