import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Play, Profile, Veicles } from '../../screens'

import React from 'react'
import { CustomTabNavigation } from '../../components/mols';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SecuredRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Start"
    >
      <Stack.Screen
        name="Start"
        options={{ headerShown: false }}
      >
        {() => (
          <CustomTabNavigation />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  )
}

export default SecuredRoutes