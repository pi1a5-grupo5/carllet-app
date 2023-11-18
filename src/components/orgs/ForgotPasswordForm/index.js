import React, {useState} from 'react';
import {View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {
  Button, Icon, Input, Stack, FormControl,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

const ForgotPasswordForm = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();

  const validationSchema = Yup.object().shape({
    code: Yup
        .number()
        .required('Campo obrigatório'),
    password: Yup
        .string()
        .min(8, 'Senha deve ter no mínimo 8 caracteres').required('Campo obrigatório'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais').required('Campo obrigatório'),
  });


  const handleResetPasswordSubmit = (values) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Formik
        initialValues={{
          code: '',
          password: '',
          confirmPassword: '',
        }}
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
                isInvalid={!!(errors.code && touched.code)}
              >
                <Input
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('passcodeword')}
                  size={'md'}
                  placeholder="Código"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="confirmation-num" />} marginLeft={2} />
                  }
                  type='number'
                  value={values.code}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.code}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.password && touched.password)}
              >
                <Input
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  size={'md'}
                  placeholder="Senha"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="lock" />} marginLeft={2} />
                  }
                  type='password'
                  value={values.password}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}
              >
                <Input
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  size={'md'}
                  placeholder="Confirme a senha"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="lock" />} marginLeft={2} />
                  }
                  type='password'
                  value={values.confirmPassword}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.confirmPassword}
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
                {t('pages.password.changePassword')}
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

export default ForgotPasswordForm;
