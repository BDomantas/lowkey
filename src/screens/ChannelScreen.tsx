import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@Root/MainStackNavigator';
import {useAppDispatch} from '@State/hooks';
import {fetchChannel} from 'state/slices/Channels/ChannelsThunks';
import MessageList from 'components/Channel/MessageList';
import {fetchCurrentUser} from 'state/slices/Users/UsersThunks';
import BottomPollModal from '@Components/Poll/BottomPollModal';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'ChannelScreen'>;

const ChannelScreen = ({
  navigation,
  route: {
    params: {channelId},
  },
}: ScreenProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const initializeChannel = async () => {
      await dispatch(fetchCurrentUser());
      const resultAction = await dispatch(fetchChannel(channelId)).unwrap();
      navigation.setParams({
        totalMembers: resultAction.members.length,
        onlineMembers: resultAction.onlineMembers,
        loading: false,
      });
    };

    initializeChannel();
  }, [dispatch, channelId, navigation]);

  const onOpenModal = () => {
    setIsModalVisible(currentValue => !currentValue);
    console.log(isModalVisible);
  };

  return (
    <View style={styles.container}>
      <MessageList channelId={channelId} onOpenModal={onOpenModal} />
      <BottomPollModal
        channelId={channelId}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChannelScreen;
