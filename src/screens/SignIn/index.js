import { SignInForm, PageContainer, Logo } from '../../components'
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
      <Logo />
      <SignInForm
        navigation={navigation}
      />
    </PageContainer>
  )
}

export default SignIn