import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from 'state/store';
import {
  ContentType,
  isPollMessage,
  SendMessageParams,
  SendMessageResult,
  SendVoteParams,
} from '@State/slices/Messages/types';
import {channelsSelectors} from '@State/slices/Channels/ChannelsSlice';
import {messagesSelectors} from '@State/slices/Messages/MessagesSlice';

export const sendMessage = createAsyncThunk<
  SendMessageResult,
  SendMessageParams,
  {
    state: RootState;
  }
>(
  'messages/sendMessage',
  async ({message, channelId, type}: SendMessageParams, {getState}) => {
    console.log(
      `sending message - ${message} of type ${type} in channel - ${channelId}`,
    );
    const {users} = getState();
    const currentUserId = users.currentUser?.userId;
    if (currentUserId && message && message.content) {
      return Promise.resolve({
        success: true,
        message,
        channelId,
        type,
        author: currentUserId,
      });
    }
    return Promise.resolve({
      success: false,
      message,
      channelId,
      type,
      author: '',
    });
  },
);

export const sendVote = createAsyncThunk<
  SendMessageResult,
  SendVoteParams,
  {
    state: RootState;
  }
>('messages/sendVote', async ({messageId, optionId, channelId}, {getState}) => {
  console.log(
    `sending vote for message - ${messageId} with option - ${optionId}`,
  );
  // Actually there would be just API call and it would either succeed or not and return new message obj.
  // This is just because of mocking
  const state = getState();
  const currentUserId = state.users.currentUser?.userId;
  const currentChannel = channelsSelectors.selectById(state, channelId);
  if (currentChannel && currentUserId) {
    const selectedMessage = messagesSelectors.selectById(
      currentChannel,
      messageId,
    );
    if (selectedMessage && isPollMessage(selectedMessage.message)) {
      return Promise.resolve({
        success: true,
        message: {
          content: {
            ...selectedMessage.message.content,
            votes: selectedMessage.message.content.votes + 1,
          },
        },
        type: ContentType.poll,
        author: selectedMessage.author,
        channelId: currentChannel.channelId,
      });
    }
  }
  return Promise.resolve({
    success: false,
    message: {
      content: '',
    },
    channelId,
    type: ContentType.poll,
    author: '',
  });
});
