import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {RootState} from '@State/store';
import {fetchChannelMembers} from '../Channels/ChannelsThunks';
import {fetchCurrentUser} from './UsersThunks';

export type User = {
  userId: string;
  name: string;
  fullName: string;
  avatar: string;
};

export const usersAdapter = createEntityAdapter<User>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: user => user.userId,
});

// const fetchMessages = createAsyncThunk('m/fetchMessages', async roomId => {
//   return chatsAPI.fetchMessages(roomId);
// });

interface UserStateExtraFields {
  currentUser?: User;
}

//interface UserState extends EntityState<User>, UserStateExtraFields {}

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<UserStateExtraFields>({
    currentUser: undefined,
  }),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      usersAdapter.addOne(state, action.payload.user);
    });
    builder.addCase(fetchChannelMembers.fulfilled, (state, action) => {
      usersAdapter.addMany(state, action.payload);
    });
  },
});

export const usersSelector = usersAdapter.getSelectors<RootState>(
  state => state.users,
);

export const {} = usersSlice.actions;

export default usersSlice.reducer;
