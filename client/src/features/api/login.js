import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const login = createAsyncThunk(
  'api/login',
  async (payload, { dispatch }) => {
    try {
      const url = getApiUrl('auth/login');
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await handleResponseErrors(response, false, dispatch);
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
);
