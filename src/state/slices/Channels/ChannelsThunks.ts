import {createAsyncThunk} from '@reduxjs/toolkit';
import mockApi from '@State/api/mockApi';
import {Message} from '@State/slices/Messages/types';
import {User} from '../Users/UsersSlice';
import {unwrapResult} from '@reduxjs/toolkit';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await mockApi.fetchChannels();
    return response.data;
  },
);

export const fetchChannelMessages = createAsyncThunk<Message[], string>(
  'channels/fetchChannelMessages',
  async (id: string) => {
    const response = await mockApi.fetchChannelMessages(id);
    return response.data;
  },
);

export const fetchChannelMembers = createAsyncThunk<User[], string>(
  'channels/fetchChannelMembers',
  async (id: string) => {
    const response = await mockApi.fetchChannelMembers(id);
    return response.data;
  },
);

export const fetchChannel = createAsyncThunk(
  'channel/fetchChannel',
  async (id: string, {dispatch, rejectWithValue}) => {
    const channelMessages = dispatch(fetchChannelMessages(id));
    const channelMembers = dispatch(fetchChannelMembers(id));

    try {
      const [channelMessagesResult, channelMembersResult] = await Promise.all([
        channelMessages,
        channelMembers,
      ]);

      // Unwrapping to not lose types of the data returned from these thunks in component
      const unwrappedChannelMembersResult = unwrapResult(channelMembersResult);
      const unwrappedChannelMessagesResult = unwrapResult(
        channelMessagesResult,
      );

      return {
        messages: unwrappedChannelMessagesResult,
        members: unwrappedChannelMembersResult,
        onlineMembers: 1,
      };
    } catch (err) {
      return rejectWithValue({error: 'whoops'});
    }
  },
);
