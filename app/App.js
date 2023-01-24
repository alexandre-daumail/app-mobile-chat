import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';

import AuthNavigator from './src/navigators/AuthNavigator';
import LoggedInNavigator from './src/navigators/LoggedInNavigator';

import { AuthState, AuthReducer } from './src/security/Context'


const Stack = createStackNavigator();

export default function App() {

  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN':
          return {
            ...state,
            isLoggedIn: true,
          };
        case 'LOGOUT':
          return {
            ...state,
            isLoggedIn: false,
          };
        default:
          return state;
      }
    },
    { 
      isLoggedIn: true,
    }
  );

  const authContext = React.useMemo(() => ({
    login: () => dispatch({ type: 'LOGIN' }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  }), []);


  return (
    <AuthState.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!state.isLoggedIn ? (
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
      </NavigationContainer>
    </AuthState.Provider>
  );
}

AppRegistry.registerComponent('Appname', () => App);
