import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const signup = createAsyncThunk(
  'api/signup',
  async (payload, { dispatch }) => {
    try {
      const url = getApiUrl('auth/signup');
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(payload),
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
