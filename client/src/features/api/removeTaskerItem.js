import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const removeTaskerItem = createAsyncThunk(
  'api/removeTaskerItem',
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete/task?id=${payload}`,
        {
          method: 'DELETE',
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
