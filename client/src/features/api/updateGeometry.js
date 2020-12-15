import { createAsyncThunk } from '@reduxjs/toolkit';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateGeometry = createAsyncThunk(
  'api/updateGeometry',
  async (_, { getState }) => {
    const { walls } = getState();
    const body = [...new Set(walls.toUpsert)].map(e => walls.entities[e]);
    const toDeleteIds = walls.toDelete.map(e => e.id);
    const reqFloors = new Set([...body, ...walls.toDelete].map(e => e.floor));
    const params =
      '?' +
      reqQueryParams(toDeleteIds, 'del') +
      '&' +
      reqQueryParams([...reqFloors], 'fl');

    try {
      const response = await fetch(
        'http://localhost:5000/api/update/geometry' + params,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        }
      );
      if (response.status >= 400 && response.status < 600) {
        throw new Error('Server Error');
      }
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
