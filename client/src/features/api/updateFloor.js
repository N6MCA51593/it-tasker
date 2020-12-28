import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';

export const updateFloor = createAsyncThunk(
  'api/updateFloor',
  async (payload, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:5000/api/update/floor', {
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
