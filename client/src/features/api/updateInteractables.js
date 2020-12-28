import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateInteractables = createAsyncThunk(
  'api/updateInteractables',
  async (_, { dispatch, getState }) => {
    const { devices, areas } = getState();
    const areasParams = reqQueryParams(areas.toDelete, 'adel');
    const devicesParams = reqQueryParams(devices.toDelete, 'ddel');
    const params = `?${(areasParams ? areasParams + '&' : '') + devicesParams}`;

    // Remove duplicates
    const body = {
      areas: [...new Set(areas.toUpsert)].map(e => areas.entities[e]),
      devices: [...new Set(devices.toUpsert)].map(e => devices.entities[e])
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/update/interactables' + params,
        {
          method: 'POST',
          body: JSON.stringify(body),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
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
