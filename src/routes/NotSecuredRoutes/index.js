import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen, SignUpScreen, ForgotPasswordScreen, ResetPasswordScreen } from '../../screens'

import React from 'react'

const Stack = createNativeStackNavigator()

const NotSecuredRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
    >
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  )
}

export default NotSecuredRoutes