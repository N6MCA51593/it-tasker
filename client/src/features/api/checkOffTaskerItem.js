import { createAsyncThunk } from '@reduxjs/toolkit';

export const checkOffTaskerItem = createAsyncThunk(
  'api/checkOffTaskerItem',
  async payload => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/check-off/task?id=${payload}`,
        {
          method: 'POST',
          mode: 'cors'
        }
      );

      if (response.status >= 400 && response.status < 600) {
        throw new Error('Server Error');
      }

      await response.json();
      return payload;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
