import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const loadAppData = createAsyncThunk(
  'api/loadAppData',
  async (_, { dispatch }) => {
    try {
      const url = getApiUrl('load');
      const response = await fetch(url, {
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
