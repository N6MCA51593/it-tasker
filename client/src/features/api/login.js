import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('api/login', async payload => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(payload),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      throw new Error('Auth Error');
    }

    if (response.status >= 400 && response.status < 600) {
      throw new Error('Server Error');
    }

    const res = await response.json();
    return res;
  } catch (error) {
    throw new Error(error);
  }
});
