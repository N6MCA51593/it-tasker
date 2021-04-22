import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const removeFloor = createAsyncThunk(
  'api/removeFloor',
  async (payload, { dispatch }) => {
    try {
      const url = getApiUrl(`delete/floor?id=${payload}`);
      const response = await fetch(url, {
        method: 'DELETE',
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
