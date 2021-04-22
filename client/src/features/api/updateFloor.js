import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const updateFloor = createAsyncThunk(
  'api/updateFloor',
  async (payload, { dispatch }) => {
    const url = getApiUrl('update/floor');
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      await handleResponseErrors(response, true, dispatch);
      const updatedFloors = await response.json();
      return { id: payload.id, updatedFloors };
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
