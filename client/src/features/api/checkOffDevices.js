import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
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
      const url = getApiUrl('check-off/devices');
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      });
      await handleResponseErrors(response, true, dispatch);
      return;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
