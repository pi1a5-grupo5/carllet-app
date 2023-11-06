import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormControl, Stack, TextArea, Input, Icon, Button } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


const RegisterMaintenanceExpenseForm = ({ navigation }) => {
  const [maintenanceTypes, setMaintenanceTypes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const registerEarningValidationSchema = Yup.object().shape({
    userVehicleId: Yup
      .number()
      .required('Campo obrigatório'),
    maintenanceDate: Yup
      .string()
      .required('Campo obrigatório'),
    maintenanceValue: Yup
      .number()
      .required('Campo obrigatório'),
    maintenanceDetails: Yup
      .string()
      .required('Campo obrigatório'),
    maintenanceExpenseTypeId: Yup
      .number()
      .required('Campo Obrigatório'),
    originatingExpenseId: Yup
      .number()
      .required('Campo Obrigatório'),
  });


  const getEarningTypes = async () => {
    return 0;
  }

  useEffect(() => {
    getEarningTypes()
      .then(res => {
        setMaintenanceTypes(res);
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
          maintenanceDate: '',
          maintenanceValue: '',
          maintenanceDetails: '',
          maintenanceExpenseTypeId: '',
          originatingExpenseId: '',
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
                isInvalid={!!(errors.maintenanceDate && touched.maintenanceDate)}
              >
                <Input
                  onChangeText={handleChange('maintenanceDate')}
                  onBlur={handleBlur('maintenanceDate')}
                  onFocus={() => setShowDateTimePicker(true)}
                  size={'md'}
                  placeholder="Data"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="date-range" />} marginLeft={2} />
                  }
                  type='date'
                  value={values.maintenanceDate}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.maintenanceDate}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.maintenanceValue && touched.maintenanceValue)}
              >
                <Input
                  onChangeText={handleChange('maintenanceValue')}
                  onBlur={handleBlur('maintenanceValue')}
                  size={'md'}
                  placeholder="Valor"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="attach-money" />} marginLeft={2} />
                  }
                  type='number'
                  value={values.maintenanceValue}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.maintenanceValue}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.maintenanceExpenseTypeId && touched.maintenanceExpenseTypeId)}
              >
                <Input
                  onChangeText={handleChange('maintenanceExpenseTypeId')}
                  onBlur={handleBlur('maintenanceExpenseTypeId')}
                  size={'md'}
                  placeholder="Tipo de despesa"
                  variant="outline"
                  width={'100%'}
                  value={values.maintenanceExpenseTypeId}
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
                  {errors.maintenanceExpenseTypeId}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.originatingExpenseId && touched.originatingExpenseId)}
              >
                <Input
                  onChangeText={handleChange('originatingExpenseId')}
                  onBlur={handleBlur('originatingExpenseId')}
                  size={'md'}
                  placeholder="Despesa de origem"
                  variant="outline"
                  width={'100%'}
                  value={values.originatingExpenseId}
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
                  {errors.originatingExpenseId}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.maintenanceDetails && touched.maintenanceDetails)}
              >
                <TextArea
                  onChangeText={handleChange('maintenanceDetails')}
                  onBlur={handleBlur('maintenanceDetails')}
                  size={'md'}
                  placeholder="Detalhes"
                  variant="outline"
                  width={'100%'}
                  value={values.maintenanceDetails}
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
                  {errors.maintenanceDetails}
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

export default RegisterMaintenanceExpenseForm