import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';
import { resetState } from 'features/auth/authStateSlice';

export const logout = createAsyncThunk(
  'api/logout',
  async (_, { dispatch }) => {
    try {
      const url = getApiUrl('auth/logout');
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors'
      });
      await handleResponseErrors(response, true, dispatch);
      dispatch(resetState());
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
);
