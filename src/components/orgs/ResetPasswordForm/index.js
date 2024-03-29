import React, {useState} from 'react';
import {View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {
  Button, Icon, Input, Stack, FormControl,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AuthService} from '../../../services/auth.service';
import {openToast} from '../../../utils/openToast';
import {useTranslation} from 'react-i18next';

const ResetPasswordForm = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Email inválido')
        .required('Campo obrigatório'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();

  const handleResetPasswordSubmit = async (values) => {
    setIsLoading(true);

    const {email} = values;

    try {
      await AuthService.forgotPassword(email);

      return navigation.navigate('ForgotPassword');
    } catch (error) {
      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Nao conseguimos completar a sua requisicao. Tente novamente mais tarde.',
      });

      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{email: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => handleResetPasswordSubmit(values)}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Stack
              space={4}
              alignItems="center"
              width={'100%'}
            >
              <FormControl
                isRequired
                isInvalid={!!(errors.email && touched.email)}
              >
                <Input
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  size={'md'}
                  placeholder="Email"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="email" />} marginLeft={2} />
                  }
                  type='email'
                  value={values.email}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
            </Stack>
            <View
              style={{
                width: '100%',
                marginTop: 10,
              }}
            >
              <Button
                onPress={handleSubmit}
                title="Submit"
                variant="solid"
                colorScheme="primary"
                marginTop={2}
                width={'100%'}
                isLoading={isLoading}
                isLoadingText='Carregando...'
              >
                {t('pages.password.recoverPasword')}
              </Button>

              <Button
                variant="ghost"
                colorScheme="primary"
                marginTop={2}
                width={'100%'}
                onPress={() => navigation.navigate('SignIn')}
              >
                {t('pages.buttons.cancel')}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
