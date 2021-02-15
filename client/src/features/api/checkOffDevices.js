import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';
import {
  clearRequestObject,
  toggleDeviceCheckOff
} from 'features/tasker/taskerSlice';

export const checkOffDevices = createAsyncThunk(
  'api/checkOffDevices',
  async (payload, { dispatch, getState }) => {
    dispatch(toggleDeviceCheckOff(payload));
    const requestObject = { ...getState().tasker.toggleCheckOffRequestObject };
    if (Object.keys(requestObject).length === 0) {
      return;
    }

    dispatch(clearRequestObject());

    try {
      const response = await fetch(
        'http://localhost:5000/api/check-off/devices',
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestObject)
        }
      );
      await handleResponseErrors(response, true, dispatch);
      return;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
