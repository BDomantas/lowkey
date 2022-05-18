import React from 'react';
import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MessageComponent from '@Components/Channel/Message';
import {useAppDispatch, useAppSelector} from '@State/hooks';
import {channelMessages} from '@State/slices/Channels/ChannelsSelectors';
import {Colors} from '@Styles/Colors';
import BottomControls from './BottomControls';
import {useHeaderHeight} from '@react-navigation/elements';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {sendMessage} from '@State/slices/Messages/MessagesThunks';
import {ContentType, MessageContent} from '@State/slices/Messages/types';

interface MessageListProps {
  channelId: string;
  onOpenModal: () => void;
}

const MessageList = ({
  channelId,
  onOpenModal,
}: MessageListProps): JSX.Element => {
  const channelMessagesData = useAppSelector(state =>
    channelMessages(state, channelId),
  );
  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const onSendPress = (message: MessageContent) => {
    return dispatch(
      sendMessage({message: message, channelId, type: ContentType.text}),
    ).unwrap();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flatList}
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}
        keyboardVerticalOffset={Platform.select({
          ios: headerHeight + insets.bottom,
          android: 160,
        })}>
        <FlatList
          style={styles.flatList}
          data={channelMessagesData}
          renderItem={item => <MessageComponent {...item} />}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
        <BottomControls onSendPress={onSendPress} onCreatePoll={onOpenModal} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignSelf: 'stretch',
  },
  flatList: {
    flex: 1,
  },
});

export default MessageList;
