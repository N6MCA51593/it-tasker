import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateInteractables = createAsyncThunk(
  'api/updateInteractables',
  async (_, { dispatch, getState }) => {
    const { devices, areas } = getState();
    if (
      areas.toDelete.length === 0 &&
      areas.toUpsert.length === 0 &&
      devices.toDelete.length === 0 &&
      devices.toUpsert.length === 0
    ) {
      return;
    }

    const areasParams = reqQueryParams(areas.toDelete, 'adel');
    const devicesParams = reqQueryParams(devices.toDelete, 'ddel');
    const params = `?${(areasParams ? areasParams + '&' : '') + devicesParams}`;

    // Remove duplicates
    const body = {
      areas: [...new Set(areas.toUpsert)].map(e => areas.entities[e]),
      devices: [...new Set(devices.toUpsert)].map(e => devices.entities[e])
    };

    try {
      const url = getApiUrl('update/interactables');
      const response = await fetch(url + params, {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      await handleResponseErrors(response, true, dispatch);
      return true;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
