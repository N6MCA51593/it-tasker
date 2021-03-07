import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const setDeviceStatus = createAsyncThunk(
  'api/setDeviceStatus',
  async (payload, { dispatch }) => {
    const { id, status } = payload;
    try {
      const response = await fetch(
        `http://localhost:5000/api/update/device-status?id=${id}&status=${status}`,
        {
          method: 'POST',
          credentials: 'include',
          mode: 'cors'
        }
      );
      await handleResponseErrors(response, true, dispatch);
      return;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
