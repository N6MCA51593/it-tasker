import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleDeviceCheckOff } from 'features/tasker/taskerSlice';

export const checkOffDevices = createAsyncThunk(
  'api/checkOffDevices',
  async (payload, { dispatch, getState }) => {
    dispatch(toggleDeviceCheckOff(payload));
    try {
      // const response = await fetch('http://localhost:5000/api/load', {
      //   method: 'GET',
      //   mode: 'cors'
      // });
      // if (response.status >= 400 && response.status < 600) {
      //   throw new Error('Server Error');
      // }
      // const res = await response.json();
      // return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
