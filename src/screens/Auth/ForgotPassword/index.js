import { Text } from 'react-native'
import React from 'react'
import { BackButton, ForgotPasswordForm } from '../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPassword = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        padding: 20
      }}
    >
      {/* // BACK BUTTON */}
      <BackButton navigation={navigation} />

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Alterar senha
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20
        }}
      >
        Para alterar a sua senha, preencha os campos abaixo.
      </Text>
      {/* // RESET PASSWORD UP FORM */}
      <ForgotPasswordForm
        navigation={navigation}
      />
    </SafeAreaView>
  )
}

export default ForgotPassword