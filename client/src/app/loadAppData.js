import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadAppData = createAsyncThunk('loadAppData', async () => {
  const response = await fetch('http://localhost:5000/api/load', {
    method: 'GET',
    mode: 'cors'
  })
    .then(res => res.json())
    .catch(e => console.log(e));
  return response;
});
