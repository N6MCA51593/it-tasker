import { createAsyncThunk } from '@reduxjs/toolkit';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateTaskerItem = createAsyncThunk(
  'api/updateTaskerItem',
  async (changes, { getState }) => {
    const { tasker } = getState();
    const item = tasker.entities[tasker.activeItem];
    const { isNew, devices } = item;
    let params = '';
    if (isNew) {
      params = '?' + reqQueryParams(devices, 'add');
    } else {
      const newDeviceSet = new Set(devices);
      const oldDeviceSet = new Set(tasker.taskerHistory.devices);
      const toAddArr = [...newDeviceSet].filter(id => !oldDeviceSet.has(id));
      const toDeleteArr = [...oldDeviceSet].filter(id => !newDeviceSet.has(id));
      const toAdd = reqQueryParams(toAddArr, 'add');
      const toDelete = reqQueryParams(toDeleteArr, 'del');
      params = '?' + toAdd + (toAdd ? '&' : '') + toDelete;
    }

    const body = { ...item, ...changes };

    try {
      const response = await fetch(
        'http://localhost:5000/api/update/task' + params,
        {
          method: 'POST',
          credentials: 'include',
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
