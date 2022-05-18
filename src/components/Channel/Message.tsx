import React from 'react';
import {View, StyleSheet, ListRenderItem, Text, Image} from 'react-native';
import {
  ContentType,
  Message as MessageType,
} from '@State/slices/Messages/types';
import {Colors} from '@Styles/Colors';
import {useAppSelector} from '@State/hooks';
import {userById} from 'state/slices/Users/usersSelectors';
import PollMessage from 'components/Poll/PollMessage';
import {useAppDispatch} from '@State/hooks';
import {sendVote} from '@State/slices/Messages/MessagesThunks';

const Message: ListRenderItem<MessageType> = ({item}): JSX.Element => {
  const user = useAppSelector(state => userById(state, item.author));

  const dispatch = useAppDispatch();

  const onVotePress = (id: string) => {
    dispatch(
      sendVote({
        messageId: item.messageId,
        optionId: id,
        channelId: item.channelId,
      }),
    );
  };

  console.log(item);
  if (item.type === ContentType.text) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Image style={styles.image} source={{uri: user?.avatar}} />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{user?.fullName}</Text>
            <Text style={styles.contentText}>{item.message?.content}</Text>
          </View>
        </View>
      </View>
    );
  }
  if (item.type === ContentType.poll && user) {
    return (
      <PollMessage
        poll={item.message.content}
        user={user}
        onVotePress={onVotePress}
      />
    );
  }
  return <Text>Error</Text>;
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingVertical: 6, paddingLeft: 15},
  image: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  messageContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  nameText: {
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  contentText: {
    color: Colors.textPrimary,
    lineHeight: 22,
  },
});

export default Message;
