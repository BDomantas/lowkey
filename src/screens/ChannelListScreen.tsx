import React, {useEffect} from 'react';
import {
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@Root/MainStackNavigator';
import {useAppDispatch, useAppSelector} from '@State/hooks';
import {fetchChannels} from '@State/slices/Channels/ChannelsThunks';
import {allChannels} from '@State/slices/Channels/ChannelsSelectors';
import {Channel} from 'state/slices/Channels/ChannelsSlice';
import {Colors} from '@Styles/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChannelListScreen'
>;

interface ItemProps {
  item: Channel;
  onPress: () => void;
}

const Item = ({item, onPress}: ItemProps) => (
  <Pressable onPress={onPress} style={[styles.item]}>
    <Text style={[styles.title]}>{item.name}</Text>
  </Pressable>
);

const ChannelListScreen = ({navigation}: ScreenProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(allChannels);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  const renderItem: ListRenderItem<Channel> = ({item}) => {
    console.log('items', item);
    return (
      <Item
        item={item}
        onPress={() => navigation.push('ChannelScreen', item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={channels}
        extraData={channels}
        renderItem={renderItem}
        keyExtractor={item => item.channelId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 16,
  },
  container: {
    backgroundColor: '#2E2C3C',
    flex: 1,
  },
  item: {
    backgroundColor: Colors.secondary,
  },
  title: {
    fontSize: 32,
    color: Colors.textSecondary,
    paddingLeft: 16,
  },
});

export default ChannelListScreen;
