import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, SignUp, ForgotPassword, ResetPassword } from '../../screens'

import React from 'react'

const Stack = createNativeStackNavigator()

const NotSecuredRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  )
}

export default NotSecuredRoutes