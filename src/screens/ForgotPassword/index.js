import {Text} from 'react-native';
import React from 'react';
import {
  BackButton, ForgotPasswordForm, PageContainer,
} from '../../components';

const ForgotPassword = ({navigation}) => {
  return (
    <PageContainer>
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
          marginBottom: 20,
        }}
      >
        Para alterar a sua senha, preencha os campos abaixo.
      </Text>
      <ForgotPasswordForm
        navigation={navigation}
      />
    </PageContainer>
  );
};

export default ForgotPassword;
