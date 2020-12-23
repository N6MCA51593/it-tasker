import { createAsyncThunk } from '@reduxjs/toolkit';

export const signup = createAsyncThunk('api/signup', async payload => {
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

    if (response.status >= 400 && response.status < 600) {
      throw new Error('Server Error');
    }

    const res = await response.json();
    return res;
  } catch (error) {
    throw new Error(error);
  }
});
