import { createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from 'common/getApiURL';
import handleResponseErrors from 'features/api/handleResponseErrors';
import { reqQueryParams } from 'features/api/reqQueryParams';

export const updateTaskerItem = createAsyncThunk(
  'api/updateTaskerItem',
  async (changes, { getState, dispatch }) => {
    const { tasker } = getState();
    const item = tasker.entities[tasker.activeItem];
    const { isNew, devices } = item;
    let params = '';
    const ts = arr => {
      return arr.reduce(
        (acc, id) =>
          (acc += `&${id}=${tasker.byDevice[id][tasker.activeItem].addedAt}`),

        ''
      );
    };

    if (isNew) {
      params = '?' + reqQueryParams(devices, 'add') + ts(devices);
    } else {
      const newDeviceSet = new Set(devices);
      const oldDeviceSet = new Set(tasker.taskerHistory.devices);
      const toAddArr = [...newDeviceSet].filter(id => !oldDeviceSet.has(id));
      const toDeleteArr = [...oldDeviceSet].filter(id => !newDeviceSet.has(id));
      const toAdd = reqQueryParams(toAddArr, 'add');
      const toDelete = reqQueryParams(toDeleteArr, 'del');
      params = '?' + toAdd + ts(toAddArr) + (toAdd ? '&' : '') + toDelete;
    }

    const body = { ...item, ...changes };

    try {
      const url = getApiUrl('update/task');
      const response = await fetch(url + params, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      await handleResponseErrors(response, true, dispatch);
      const res = await response.json();
      return res;
    } catch (error) {
      throw new Error('Server Error');
    }
  }
);
