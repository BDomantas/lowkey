import {createAsyncThunk} from '@reduxjs/toolkit';
import mockApi from '@State/api/mockApi';

export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrentUser',
  async () => {
    const response = await mockApi.fetchCurrentUser();
    return response.data;
  },
);
