import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const loadAppData = createAsyncThunk(
  'api/loadAppData',
  async (_, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:5000/api/load', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      });
      await handleResponseErrors(response, true, dispatch);
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
