import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { Button, Icon, Input, Stack, Divider, IconButton, FormControl } from 'native-base'
import { Pressable } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

const SignUpForm = ({ navigation }) => {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Campo obrigatório'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais').required('Campo obrigatório'),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmitRegistration = (values) => {
    setIsLoading(true)

    console.log(values)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmitRegistration(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                isInvalid={!!(errors.name && touched.name)}
              >
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  size={'md'}
                  placeholder="Nome"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="person" />} marginLeft={2} />
                  }
                  type='text'
                  value={values.name}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
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
                      <Icon as={<MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} />} marginRight={2} />
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
                  type={showPassword ? 'text' : 'password'}
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
                marginTop: 10
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
                isLoadingText='Entrando...'
              >
                Registrar
              </Button>

              <Button
                variant="ghost"
                colorScheme="primary"
                marginTop={2}
                width={'100%'}
                onPress={() => navigation.navigate('SignIn')}
              >
                Cancelar
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </>
  )
}

export default SignUpForm