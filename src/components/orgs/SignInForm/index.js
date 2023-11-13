import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {
  Button, Icon, Input, Stack, Divider, IconButton, FormControl,
} from 'native-base';
import {Pressable} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AuthService} from '../../../services/auth.service';
import {useUserContext} from '../../../hooks/useUserContext';
import {openToast} from '../../../utils/openToast';

const SignInForm = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Campo obrigatório'),
  });

  const {setUser, setIsLogged} = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleLoginSubmit = async (values) => {
    setIsLoading(true);

    try {
      const {email, password} = values;

      const loggedUser = await AuthService.login({
        email,
        password,
      });

      if (loggedUser) {
        setUser(loggedUser);
        setIsLogged(true);
      }

      if (!loggedUser) {
        openToast({
          status: 'warning',
          title: 'Erro',
          description: 'Email ou senha inválidos',
        });
      }

      setIsLoading(false);
    } catch (error) {
      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Nao conseguimos completar a sua requisicao. Tente novamente mais tarde.',
      });

      setIsLoading(false);

      throw new Error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLoginSubmit(values)}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <>
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
                  InputRightElement={
                    <Pressable
                      onPress={handleShowPassword}
                    >
                      <Icon as={
                        <MaterialIcons
                          name={showPassword ? 'visibility-off' : 'visibility'}
                        />
                      }
                      marginRight={2}
                      />
                    </Pressable>
                  }
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.password}
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
                onPress={() => navigation.navigate('ResetPassword')}
                variant="link"
                colorScheme="primary"
                marginTop={2}
                style={{alignSelf: 'flex-end'}}
              >
                Esqueceu sua senha?
              </Button>
              <Button
                onPress={handleSubmit}
                title="Submit"
                variant="solid"
                colorScheme="primary"
                marginTop={2}
                width={'100%'}
                isLoading={isLoading}
                isLoadingText='Entrando...'
              >
                Entrar
              </Button>
              <Button
                onPress={() => navigation.navigate('SignUp')}
                variant="link"
                colorScheme="primary"
                marginTop={2}
                width={'100%'}
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                Não tem uma conta? Cadastre-se
              </Button>
            </View>
          </>
        )}
      </Formik>

      {/*    <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          marginTop: 20,
        }}
      >
        <Divider />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            position: 'absolute',
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 15,
          }}
        >
          ou continue com
        </Text>
      </View> */}

      {/*   <Stack
        space={4}
        alignItems="center"
        direction="row"
        marginTop={7}
      >
        <IconButton
          variant="outline"
          paddingRight={1}
          isDisabled
          icon={
            <Icon
              as={
                <FontAwesome5 name="apple" />
              }
              size={5}
            />}
          flex={1}
        />

        <IconButton
          variant="outline"
          colorScheme="primary"
          isDisabled
          icon={
            <Icon
              as={
                <FontAwesome5 name="google" />
              }
              size={5}
            />}
          flex={1}
        />

        <IconButton
          variant="outline"
          colorScheme="primary"
          isDisabled
          paddingRight={1}
          icon={
            <Icon
              as={
                <FontAwesome5 name="facebook-f" />
              }
              size={5}
            />
          }
          flex={1}
        />
      </Stack> */}
    </>
  );
};

export default SignInForm;
