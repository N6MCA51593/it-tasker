import { createAsyncThunk } from '@reduxjs/toolkit';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateGeometry = createAsyncThunk(
  'api/updateGeometry',
  async (_, { getState }) => {
    const { floors, walls } = getState();
    const floor = floors.activeFloor;
    const params = '?' + reqQueryParams(walls.toDelete, 'del') + '&fl=' + floor;

    // Remove duplicates
    const body = [...new Set(walls.toUpsert)].map(e => walls.entities[e]);

    const res = await fetch(
      'http://localhost:5000/api/update/geometry' + params,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    )
      .then(res => res.json())
      .catch(e => console.log(e));

    return res;
  }
);
