import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Channel from '../screens/channel/Channel';
import Channels from '../screens/channel/Channels';
import ChannelCreate from '../screens/channel/ChannelCreate';
import ChannelUsers from '../screens/channel/ChannelUsers';
import ChannelSettings from '../screens/channel/ChannelSettings';

const ChannelStack = createNativeStackNavigator();

export default function ChannelNavigator() {
  return (
    <ChannelStack.Navigator screenOptions={{ headerShown: false }}>
      <ChannelStack.Screen 
        name="Channels" 
        component={Channels}
      />
      <ChannelStack.Screen 
        name="Channel" 
        component={Channel} 
        options={({ route }) => ({ title: route.params.name })}
      />
      <ChannelStack.Screen 
        name="NewChannel"
        component={ChannelCreate}
        options={{ title: 'Créer un groupe' }}
      />
      <ChannelStack.Screen 
        name="ChannelUsers"
        component={ChannelUsers}
        options={({ route }) => ({ title: route.params.name })}
      />
      <ChannelStack.Screen 
        name="ChannelSettings"
        component={ChannelSettings}
        options={({ route }) => ({ title: route.params.name })}
      />
    </ChannelStack.Navigator>
  );
}