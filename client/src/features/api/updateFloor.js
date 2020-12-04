import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateFloor = createAsyncThunk(
  'api/updateFloor',
  async payload => {
    try {
      const response = await fetch('http://localhost:5000/api/update/floor', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });

      if (response.status >= 400 && response.status < 600) {
        throw new Error('Server Error');
      }

      const updatedFloors = await response.json();
      return { id: payload.id, updatedFloors };
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
