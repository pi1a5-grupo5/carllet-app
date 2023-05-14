import { View, Text } from 'react-native'
import { SignInForm } from '../../../components'
import React from 'react'

const SignIn = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}
    >
      <SignInForm
        navigation={navigation}
      />
    </View>
  )
}

export default SignIn