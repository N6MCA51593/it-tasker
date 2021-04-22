import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const removeTaskerItem = createAsyncThunk(
  'api/removeTaskerItem',
  async (payload, { dispatch }) => {
    try {
      const url = getApiUrl(`delete/task?id=${payload}`);
      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors'
      });
      await handleResponseErrors(response, true, dispatch);
      return payload;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
