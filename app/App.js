import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';

import AuthNavigator from './src/navigators/AuthNavigator';
import LoggedInNavigator from './src/navigators/LoggedInNavigator';

import { AuthState } from './src/security/Context'
import Firewall from './src/security/Firewall';
import { getUserId } from './src/security/AsyncStorage';
import { disconnectSocket, initiateSocketConnection } from './src/utils/socket';


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(0);

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  React.useEffect(() => {
    userCredential();
  }, [])

  return (
    <AuthState.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Firewall>
          <Stack.Navigator>
            {user == 0 ? (
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="Auth"
                  component={AuthNavigator}
                />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen 
                  name="App" 
                  component={LoggedInNavigator} 
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </Firewall>
      </NavigationContainer>
    </AuthState.Provider>
  );
}

AppRegistry.registerComponent('Appname', () => App);
