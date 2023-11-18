import {Text} from 'react-native';
import React from 'react';
import {
  BackButton, SignUpForm, PageContainer,
} from '../../components';
import {useTranslation} from 'react-i18next';

const SignUp = ({navigation}) => {
  const { t } = useTranslation();

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
          marginBottom: 20,
        }}
      >
        {t('pages.register.registrationText')}
      </Text>
      {/* // SIGN UP FORM */}
      <SignUpForm
        navigation={navigation}
      />
    </PageContainer>
  );
};

export default SignUp;
