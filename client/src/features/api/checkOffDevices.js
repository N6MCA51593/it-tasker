import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleDeviceCheckOff } from 'features/tasker/taskerSlice';

export const checkOffDevices = createAsyncThunk(
  'api/checkOffDevices',
  async (payload, { dispatch, getState }) => {
    dispatch(toggleDeviceCheckOff(payload));
    const { requestObject } = getState().tasker;
    console.log(requestObject);
    try {
      const response = await fetch(
        'http://localhost:5000/api/check-off/devices',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestObject)
        }
      );
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
