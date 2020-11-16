import { createAsyncThunk } from '@reduxjs/toolkit';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateTaskerItem = createAsyncThunk(
  'api/updateTaskerItem',
  async (changes, { getState }) => {
    const { tasker } = getState();
    const item = tasker.entities[tasker.activeItem];
    const { isNew, devices } = item;
    let params = '';
    console.log(item);
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
    const response = await fetch(
      'http://localhost:5000/api/update/task' + params,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );
    const res = await response.json();
    console.log(res);
    return res;
  }
);
