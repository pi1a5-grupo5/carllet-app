import {Text} from 'react-native';
import React from 'react';
import {
  BackButton, ForgotPasswordForm, PageContainer,
} from '../../components';
import {useTranslation} from 'react-i18next';

const ForgotPassword = ({navigation}) => {
  const {t} = useTranslation();
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
        {t("pages.password.changePassword")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
        }}
      >
        {t("pages.password.forgotPasswordText")}
      </Text>
      <ForgotPasswordForm
        navigation={navigation}
      />
    </PageContainer>
  );
};

export default ForgotPassword;
