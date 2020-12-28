import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const removeFloor = createAsyncThunk(
  'api/removeFloor',
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete/floor?id=${payload}`,
        {
          method: 'DELETE',
          credentials: 'include',
          mode: 'cors'
        }
      );
      await handleResponseErrors(response, true, dispatch);
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
