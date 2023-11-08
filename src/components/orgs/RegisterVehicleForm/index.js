import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormControl, Stack, TextArea, Input, Icon, Button, Switch, ScrollView } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { VEHICLES_MAKE } from '../../../constants/lorem.constants'

const RegisterVehicleForm = ({ navigation }) => {
  const [maintenanceTypes, setMaintenanceTypes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const registerVehicleValidationSchema = Yup.object().shape({
    make: Yup
      .string()
      .required('Campo obrigatório'),
    model: Yup
      .string()
      .required('Campo obrigatório'),
    year: Yup
      .string()
      .required('Campo obrigatório'),
    color: Yup
      .string()
      .required('Campo obrigatório'),
    isRented: Yup
      .boolean()
      .required('Campo obrigatório'),
  });

  return (
    <ScrollView
      style={{
        width: '100%',
        flex: 1,
      }}
    >
      <Formik
        initialValues={{
          make: '',
          model: '',
          year: '',
          color: '',
          isRented: false,
        }}
        validationSchema={registerVehicleValidationSchema}
        onSubmit={values => {
          setIsLoading(true);
          console.log(values)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <ScrollView
            style={{
              width: '100%',
              flex: 1,
            }}
          >
            <Stack
              space={4}
            >
              <FormControl
                isRequired
                isInvalid={!!(errors.make && touched.make)}
              >
                <FormControl.Label>Marca</FormControl.Label>
                <SelectComponent
                  value={values.make}
                  onValueChange={e => setFieldValue('make', e)}
                  placeholder={{
                    label: 'Tipo de despesa',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={VEHICLES_MAKE.map((item, index) => ({
                    label: item,
                    value: index,
                  }))}

                  Icon={() => (
                    <Icon
                      as={<MaterialIcons name="description" />}
                      size={4}
                      marginRight={3}
                      zIndex={-1}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.make}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.model && touched.model)}
              >
                <FormControl.Label>Modelo</FormControl.Label>
                <Input
                  onChangeText={handleChange('model')}
                  onBlur={handleBlur('model')}
                  value={values.model}
                  size={'md'}
                  placeholder="Modelo"
                  variant="outline"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      marginLeft="2"
                    />
                  }
                />
                <FormControl.ErrorMessage>
                  {errors.model}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.year && touched.year)}
              >
                <FormControl.Label>Ano</FormControl.Label>
                <Input
                  onChangeText={handleChange('year')}
                  onBlur={handleBlur('year')}
                  value={values.year}
                  size={'md'}
                  placeholder="Ano"
                  variant="outline"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      marginLeft="2"
                    />
                  }
                />
                <FormControl.ErrorMessage>
                  {errors.year}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.color && touched.color)}
              >
                <FormControl.Label>Cor</FormControl.Label>
                <Input
                  onChangeText={handleChange('color')}
                  onBlur={handleBlur('color')}
                  value={values.color}
                  size={'md'}
                  placeholder="Cor"
                  variant="outline"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      marginLeft="2"
                    />
                  }
                />
                <FormControl.ErrorMessage>
                  {errors.color}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!(errors.isRented && touched.isRented)}
              >
                <FormControl.Label>Alugado</FormControl.Label>
                <Switch
                  size={'md'}
                  onToggle={value => setFieldValue('isRented', value)}
                  value={values.isRented}
                  colorScheme={'primary'}
                />
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
                Registrar veículo
              </Button>
              <Button
                variant="ghost"
                colorScheme="error"
                marginTop={2}
                width={'100%'}
                onPress={() => navigation.goBack()}
              >
                Cancelar
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </ScrollView>
  )
}

export default RegisterVehicleForm