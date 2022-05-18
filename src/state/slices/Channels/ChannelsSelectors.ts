import {RootState} from '@State/store';
import {messagesSelectors} from '@State/slices/Messages/MessagesSlice';
import {channelsSelectors} from './ChannelsSlice';

export const allChannels = (state: RootState) =>
  channelsSelectors.selectAll(state);

export const channelMessages = (state: RootState, channelId: string) => {
  const channelEntity = channelsSelectors.selectById(state, channelId);
  if (channelEntity) {
    return messagesSelectors.selectAll(channelEntity);
  }
  return [];
};
