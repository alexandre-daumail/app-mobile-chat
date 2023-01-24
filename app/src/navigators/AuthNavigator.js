import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Welcome from '../screens/auth/Welcome';

const AuthStack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen 
        name="Welcome"
        component={Welcome}
      />
      <AuthStack.Screen 
        name="Connexion" 
        component={Login}
      />
      <AuthStack.Screen 
        name="Inscription" 
        component={Register} 
      />
    </AuthStack.Navigator>
  );
}