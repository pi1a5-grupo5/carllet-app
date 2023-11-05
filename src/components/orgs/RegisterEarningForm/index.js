import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormControl, Stack, TextArea } from 'native-base'

const RegisterEarningForm = ({ navigation }) => {

  const [earningTypes, setEarningTypes] = useState();

  const registerEarningValidationSchema = Yup.object().shape({
    earningDate: Yup
      .string()
      .required('Campo obrigatório'),
    earningValue: Yup
      .number()
      .required('Campo obrigatório'),
    earningDetails: Yup
      .string()
      .required('Campo obrigatório'),
    earningTypeId: Yup
      .number()
      .required('Campo Obrigatório'),
  })


  const getEarningTypes = async () => {
    return 0;
  }

  useEffect(() => {
    getEarningTypes()
      .then(res => {
        setEarningTypes(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          earningDate: '',
          earningValue: '',
          earningDetails: '',
          earningTypeId: '',
        }}
        validationSchema={registerEarningValidationSchema}
        onSubmit={values => {
          console.log(values)
        }}
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
                isInvalid={!!(errors.earningDate && touched.earningDate)}
              >
                <Input
                  onChangeText={handleChange('earningDate')}
                  onBlur={handleBlur('earningDate')}
                  size={'md'}
                  placeholder="Data"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="date-range" />} marginLeft={2} />
                  }
                  type='date'
                  value={values.earningDate}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.earningDate}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.earningValue && touched.earningValue)}
              >
                <Input
                  onChangeText={handleChange('earningValue')}
                  onBlur={handleBlur('earningValue')}
                  size={'md'}
                  placeholder="Valor"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="attach-money" />} marginLeft={2} />
                  }
                  type='number'
                  value={values.earningValue}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.earningValue}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.earningDetails && touched.earningDetails)}
              >
                <TextArea
                  onChangeText={handleChange('earningDetails')}
                  onBlur={handleBlur('earningDetails')}
                  size={'md'}
                  placeholder="Detalhes"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="description" />} marginLeft={2} />
                  }
                  type='text'
                  value={values.earningDetails}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.earningDetails}
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
                Enviar ganho
              </Button>
              <Button
                variant="ghost"
                colorScheme="primary"
                marginTop={2}
                width={'100%'}
                onPress={() => navigation.goBack()}
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

export default RegisterEarningForm