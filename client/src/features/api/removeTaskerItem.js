import { createAsyncThunk } from '@reduxjs/toolkit';

export const removeTaskerItem = createAsyncThunk(
  'api/removeTaskerItem',
  async payload => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete/task?id=${payload}`,
        {
          method: 'DELETE',
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
