import { createAsyncThunk } from '@reduxjs/toolkit';

export const removeFloor = createAsyncThunk(
  'api/removeFloor',
  async payload => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete/floor?id=${payload}`,
        {
          method: 'DELETE',
          credentials: 'include',
          mode: 'cors'
        }
      );

      if (response.status >= 400 && response.status < 600) {
        throw new Error('Server Error');
      }

      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
