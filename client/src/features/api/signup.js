import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const signup = createAsyncThunk(
  'api/signup',
  async (payload, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
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
