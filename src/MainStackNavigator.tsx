import React from 'react';
import ChannelScreen from '@Screens/ChannelScreen';
import ChannelListScreen from '@Screens/ChannelListScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultHeaderStyle} from '@Styles/Navigation';
import HeaderTitle from '@Components/HeaderTitle';
import {Channel} from '@State/slices/Channels/ChannelsSlice';

interface ChannelScreenProps
  extends Pick<
    Channel,
    'name' | 'totalMembers' | 'channelId' | 'onlineMembers'
  > {
  loading?: boolean;
}

export type RootStackParamList = {
  ChannelScreen: ChannelScreenProps;
  ChannelListScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultHeaderStyle}
      initialRouteName={'ChannelListScreen'}>
      <Stack.Screen
        name="ChannelListScreen"
        component={ChannelListScreen}
        options={{
          headerTitle: 'Channels',
        }}
      />
      <Stack.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        initialParams={{
          loading: true,
        }}
        options={({route}) => ({
          headerTitle: () => (
            <HeaderTitle
              membersCount={route.params.totalMembers}
              onlineMembersCount={route.params.onlineMembers}
              loading={route.params.loading || false}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
