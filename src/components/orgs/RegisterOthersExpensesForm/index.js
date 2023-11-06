import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormControl, Stack, TextArea, Input, Icon, Button } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';

const RegisterOthersExpensesForm = () => {
  const [otherExpensesTypes, setOtherExpensesTypes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const registerEarningValidationSchema = Yup.object().shape({
    userVehicleId: Yup
      .number()
      .required('Campo obrigatório'),
    otherExpenseDate: Yup
      .string()
      .required('Campo obrigatório'),
    otherExpenseValue: Yup
      .number()
      .required('Campo obrigatório'),
    otherExpenseDetails: Yup
      .string()
      .required('Campo obrigatório'),
    otherExpensesTyped: Yup
      .number()
      .required('Campo Obrigatório'),
  });


  const getEarningTypes = async () => {
    return 0;
  }

  useEffect(() => {
    getEarningTypes()
      .then(res => {
        setOtherExpensesTypes(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          userVehicleId: '',
          otherExpenseDate: '',
          otherExpenseValue: '',
          otherExpenseDetails: '',
          otherExpensesTyped: '',
        }}
        validationSchema={registerEarningValidationSchema}
        onSubmit={values => {
          setIsLoading(true);
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
            >
              <FormControl
                isRequired
                isInvalid={!!(errors.userVehicleId && touched.userVehicleId)}
              >
                <Input
                  onChangeText={handleChange('userVehicleId')}
                  onBlur={handleBlur('userVehicleId')}
                  value={values.userVehicleId}
                  size={'md'}
                  placeholder="Veículo"
                  variant="outline"
                  keyboardType="numeric"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      marginLeft="2"
                    />
                  }
                />
                <FormControl.ErrorMessage>
                  {errors.userVehicleId}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.otherExpenseDate && touched.otherExpenseDate)}
              >
                <Input
                  onChangeText={handleChange('otherExpenseDate')}
                  onBlur={handleBlur('otherExpenseDate')}
                  size={'md'}
                  onFocus={() => setShowDateTimePicker(true)}
                  placeholder="Data"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="date-range" />} marginLeft={2} />
                  }
                  type='date'
                  value={values.otherExpenseDate}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.otherExpenseDate}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.otherExpenseValue && touched.otherExpenseValue)}
              >
                <Input
                  onChangeText={handleChange('otherExpenseValue')}
                  onBlur={handleBlur('otherExpenseValue')}
                  size={'md'}
                  placeholder="Valor"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="attach-money" />} marginLeft={2} />
                  }
                  type='number'
                  value={values.otherExpenseValue}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.otherExpenseValue}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.otherExpensesTyped && touched.otherExpensesTyped)}
              >
                <Input
                  onChangeText={handleChange('otherExpensesTyped')}
                  onBlur={handleBlur('otherExpensesTyped')}
                  size={'md'}
                  placeholder="Tipo de despesa"
                  variant="outline"
                  width={'100%'}
                  value={values.otherExpensesTyped}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="description" />}
                      marginLeft={2}
                    />
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.otherExpensesTyped}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.otherExpenseDetails && touched.otherExpenseDetails)}
              >
                <TextArea
                  onChangeText={handleChange('otherExpenseDetails')}
                  onBlur={handleBlur('otherExpenseDetails')}
                  size={'md'}
                  placeholder="Detalhes"
                  variant="outline"
                  width={'100%'}
                  value={values.otherExpenseDetails}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="description" />}
                      marginLeft={2}
                      marginBottom={12}
                    />
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.otherExpenseDetails}
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
                Enviar despesa
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

export default RegisterOthersExpensesForm