import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const checkOffTaskerItem = createAsyncThunk(
  'api/checkOffTaskerItem',
  async (payload, { dispatch }) => {
    try {
      const url = getApiUrl(`check-off/task?id=${payload}`);
      const response = await fetch(url, {
        method: 'POST',
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
