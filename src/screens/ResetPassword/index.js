import {Text} from 'react-native';
import React from 'react';
import {
  BackButton, ResetPasswordForm, PageContainer,
} from '../../components';

const ResetPassword = ({navigation}) => {
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
        Resetar senha
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
        }}
      >
        Preencha os campos abaixo para solicitar a sua alteração de senha.
      </Text>
      {/* // RESET PASSWORD UP FORM */}
      <ResetPasswordForm
        navigation={navigation}
      />
    </PageContainer>
  );
};

export default ResetPassword;
