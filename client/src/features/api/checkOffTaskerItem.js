import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const checkOffTaskerItem = createAsyncThunk(
  'api/checkOffTaskerItem',
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/check-off/task?id=${payload}`,
        {
          method: 'POST',
          credentials: 'include',
          mode: 'cors'
        }
      );
      await handleResponseErrors(response, true, dispatch);
      return payload;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
