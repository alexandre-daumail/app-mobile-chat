import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profil from '../screens/user/Profil';
import ProfilUpdate from '../screens/user/ProfilUpdate';

const ProfilStack = createNativeStackNavigator();

export default function ProfilNavigator() {
  return (
    <ProfilStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfilStack.Screen 
        name="Profil" 
        component={Profil}
      />
      <ProfilStack.Screen 
        name="ProfilUpdate" 
        component={ProfilUpdate} 
        options={({ route }) => ({ title: route.params.name })}  
      />
    </ProfilStack.Navigator>
  )
}
