import { createAsyncThunk } from '@reduxjs/toolkit';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateInteractables = createAsyncThunk(
  'api/updateInteractables',
  async (_, { getState }) => {
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

      if (response.status >= 400 && response.status < 600) {
        throw new Error('Server Error');
      }

      return response;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
