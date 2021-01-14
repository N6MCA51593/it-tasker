import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponseErrors from 'features/api/handleResponseErrors';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateGeometry = createAsyncThunk(
  'api/updateGeometry',
  async (_, { getState, dispatch }) => {
    const { walls } = getState();
    if (walls.toDelete.length === 0 && walls.toUpsert.length === 0) {
      return;
    }

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
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        }
      );
      await handleResponseErrors(response, true, dispatch);
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
