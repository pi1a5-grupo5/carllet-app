import React, { useState } from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Button, Icon, Input, Stack,  FormControl, Box } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'

const UpdateProfileForm = ({ navigation }) => {

  const validationSchema = Yup.object().shape({
    cnh: Yup.string(),
    dateOfBirth: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string(),
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProfileSubmit = (values) => {
    setIsLoading(true)

    console.log(values)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    navigation.navigate('ForgotPassword')
  }

  return (
    <Box
      flex={1}
    >
      <Formik
        initialValues={{
          cnh: '',
          dateOfBirth: '',
          password: '',
          confirmPassowrd: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleUpdateProfileSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <Box
            height={"full"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Stack
              space={4}
              alignItems="center"
              width={'100%'}
            >
              <FormControl
                isRequired
                isInvalid={!!(errors.cnh && touched.cnh)}
              >
                <Input
                  onChangeText={handleChange('cnh')}
                  onBlur={handleBlur('cnh')}
                  size={'md'}
                  placeholder="CNH"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="badge" />} marginLeft={2} />
                  }
                  type='text'
                  value={values.cnh}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.cnh}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.dateOfBirth && touched.dateOfBirth)}
              >
                <Input
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  size={'md'}
                  placeholder="Data de nascimento"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="cake" />} marginLeft={2} />
                  }
                  type='text'
                  value={values.dateOfBirth}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.dateOfBirth}
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
                isInvalid={!!(errors.confirmPassowrd && touched.confirmPassowrd)}
              >
                <Input
                  onChangeText={handleChange('confirmPassowrd')}
                  onBlur={handleBlur('confirmPassowrd')}
                  size={'md'}
                  placeholder="Confirme sua senha"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="lock" />} marginLeft={2} />
                  }
                  type='password'
                  value={values.email}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.confirmPassowrd}
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
                isLoadingText='Carregando...'
              >
                Atualizar dados
              </Button>
              <Button
                variant="solid"
                bgColor={"red.400"}
                _pressed={{
                  backgroundColor: "red.600"
                }}
                marginTop={2}
                width={'100%'}
                onPress={() => console.log("Deletar conta")}
              >
                Deletar conta
              </Button>
            </View>
          </Box>
        )}
      </Formik>
    </Box>
  )
}

export default UpdateProfileForm