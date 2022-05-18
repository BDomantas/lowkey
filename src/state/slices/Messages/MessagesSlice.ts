import {createEntityAdapter} from '@reduxjs/toolkit';
import {Channel} from '@State/slices/Channels/ChannelsSlice';
import {Message} from '@State/slices/Messages/types';

export const messagesAdapter = createEntityAdapter<Message>({
  selectId: message => message.messageId,
});

export const messagesSelectors = messagesAdapter.getSelectors<Channel>(
  state => state.messages,
);
