import { createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk('api/logout', async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors'
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error('Server Error');
    }

    const res = await response.json();
    return res;
  } catch (error) {
    throw new Error(error);
  }
});
