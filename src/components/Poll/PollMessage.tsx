import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ListRenderItem,
  Pressable,
} from 'react-native';
import {PollMessage as PollMessageType} from '@State/slices/Messages/types';
import {Colors} from '@Styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {User} from '@State/slices/Users/UsersSlice';
import {useTranslation} from 'react-i18next';
import {Option} from '@State/slices/Messages/types';

interface PollMessageProps {
  poll: PollMessageType;
  user: User;
  onVotePress: (id: string) => void;
}

const PollMessage = ({
  poll,
  user,
  onVotePress,
}: PollMessageProps): JSX.Element => {
  const {t} = useTranslation();
  const renderOption: ListRenderItem<Option> = ({item}) => {
    return (
      <Pressable
        onPress={() => onVotePress(item.id)}
        style={styles.optionContainer}>
        <Text style={styles.optionText}>{item.content}</Text>
      </Pressable>
    );
  };

  return (
    <LinearGradient
      colors={['#A83D7F', '#6F1D7A81', '#6F1D7A81', '#03114398']}
      angle={134}
      useAngle
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={{uri: user?.avatar}} />
        <View style={styles.textContainer}>
          <Text style={styles.pollTypeText}>{t('pollType')}</Text>
          <Text style={styles.nameText}>{user?.fullName}</Text>
        </View>
        <View style={styles.voteCounterContainer}>
          <Text style={styles.votesNumberText}>{String(poll.votes || 0)}</Text>
          <Text style={styles.votesText}>{t('pollVotes')}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.questionText}>{poll.question}</Text>
        <FlatList data={poll.options} renderItem={renderOption} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  optionText: {color: Colors.textPrimary, fontSize: 12, lineHeight: 18},
  optionContainer: {
    borderRadius: 15,
    backgroundColor: Colors.pollOptionBackground,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  questionText: {
    color: Colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    paddingBottom: 12,
    opacity: 1,
  },
  voteCounterContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.pollCounterBackground,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  votesNumberText: {fontSize: 16, color: Colors.textPrimary},
  votesText: {
    fontSize: 10,
    color: Colors.textPrimary,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  nameText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    lineHeight: 18,
    fontSize: 12,
  },
  pollTypeText: {
    color: Colors.textPrimary,
    lineHeight: 16,
    fontSize: 10,
  },
});

export default PollMessage;
