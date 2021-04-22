import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';
import { setDeviceStatus as setDeviceStatusAction } from 'features/geometry/interactables/devices/deviceSlice';

export const setDeviceStatus = createAsyncThunk(
  'api/setDeviceStatus',
  async (payload, { dispatch }) => {
    const { id, status } = payload;
    dispatch(setDeviceStatusAction(payload));
    try {
      const url = getApiUrl(`update/device-status?id=${id}&status=${status}`);
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors'
      });
      await handleResponseErrors(response, true, dispatch);
      return;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
