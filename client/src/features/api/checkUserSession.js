import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const checkUserSession = createAsyncThunk(
  'api/checkUserSession',
  async (_, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });
      await handleResponseErrors(response, false, dispatch);
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
);
