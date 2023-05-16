import { View, Text } from 'react-native'
import React from 'react'
import { BackButton, SignUpForm, PageContainer } from '../../components'

const SignUp = ({ navigation }) => {
  return (
    <PageContainer>
      {/* // BACK BUTTON */}
      <BackButton navigation={navigation} />

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Cadastre-se
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20
        }}
      >
        Preencha os campos abaixo para criar sua conta na plataforma e começar a usar.
      </Text>
      {/* // SIGN UP FORM */}
      <SignUpForm
        navigation={navigation}
      />
    </PageContainer>
  )
}

export default SignUp