import {createSlice, createEntityAdapter, EntityState} from '@reduxjs/toolkit';
import {messagesAdapter} from '@State/slices/Messages/MessagesSlice';
import {RootState} from '@State/store';
import {sendMessage, sendVote} from '@State/slices/Messages/MessagesThunks';
import {Message} from '@State/slices/Messages/types';

import {fetchChannels, fetchChannelMessages} from './ChannelsThunks';

export type Channel = {
  channelId: string;
  name: string;
  messages: EntityState<Message>;
  onlineMembers: number;
  totalMembers: number;
  members: string[];
};

export const channelsAdapter = createEntityAdapter<Channel>({
  selectId: channel => channel.channelId,

  // Could be changed to sort channels with latest message or some other param
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const channelEntries = action.payload.channels.map(channel => {
          const currentChannel = state.entities[channel.channelId];
          const messages =
            currentChannel?.messages || messagesAdapter.getInitialState();
          return {
            channelId: channel.channelId,
            name: channel.name,
            members: channel.members,
            onlineMembers: channel.onlineMembers,
            totalMembers: channel.members.length,
            messages,
          };
        });

        channelsAdapter.setAll(state, channelEntries);
      })
      .addCase(fetchChannelMessages.fulfilled, (state, action) => {
        const channelId = action.meta.arg;
        const channel = state.entities[channelId];
        if (channel) {
          messagesAdapter.addMany(channel.messages, action.payload);
        }
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const channelId = action.meta.arg.channelId;
        const channel = state.entities[channelId];
        if (channel && action.payload.success) {
          messagesAdapter.addOne(channel.messages, {
            messageId: String(Math.random() * 100),
            channelId: channelId,
            type: action.payload.type,
            author: action.payload.author,
            message: action.payload.message,
          });
        }
      })
      .addCase(sendVote.fulfilled, (state, action) => {
        const channelId = action.meta.arg.channelId;
        const channel = state.entities[channelId];
        const message = channel?.messages;
        if (channel && message && action.payload.success) {
          messagesAdapter.updateOne(message, {
            id: action.meta.arg.messageId,
            changes: {
              channelId: channelId,
              type: action.payload.type,
              author: action.payload.author,
              message: action.payload.message,
            },
          });
        }
      });
  },
});

export const channelsSelectors = channelsAdapter.getSelectors<RootState>(
  state => state.channels,
);

export const {} = channelsSlice.actions;

export default channelsSlice.reducer;
