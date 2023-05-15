import { View, Text } from 'react-native'
import { SignInForm, PageContainer } from '../../../components'
import React from 'react'

const SignIn = ({ navigation }) => {
  return (
    <PageContainer
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
    </PageContainer>
  )
}

export default SignIn