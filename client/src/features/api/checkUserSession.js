import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const checkUserSession = createAsyncThunk(
  'api/checkUserSession',
  async (_, { dispatch }) => {
    try {
      const url = getApiUrl('auth');
      const response = await fetch(url, {
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
