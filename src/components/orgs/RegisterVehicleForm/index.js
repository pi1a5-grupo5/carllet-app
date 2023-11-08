import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormControl, Stack, TextArea, Input, Icon, Button, Switch, ScrollView, Box } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { VEHICLES_COLOR, VEHICLES_MAKE, VEHICLES_MODEL, VEHICLES_YEAR } from '../../../constants/lorem.constants'
import SelectComponent from '../../mols/SelectInput';

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
                  placeholder={{
                    label: 'Fabricante do veículo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={VEHICLES_MAKE.map((item, index) => ({
                    label: item,
                    value: index,
                  }))}
                  onValueChange={e => setFieldValue('make', e)}
                  value={values.make}
                  style={{
                    inputIOS: {
                      color: 'black',
                    },
                    inputAndroid: {
                      color: 'black',
                      fontSize: 14,
                      paddingHorizontal: 2,
                      paddingVertical: 8,
                      fontStyle: '100',
                    },
                    placeholder: {
                      color: '#A1A1AA',
                      fontStyle: '100',
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      margin={2}
                      size={4}
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
                <SelectComponent
                  placeholder={{
                    label: 'Modelo do veículo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={VEHICLES_MODEL.map((item, index) => ({
                    label: item,
                    value: index,
                  }))}
                  onValueChange={e => setFieldValue('model', e)}
                  value={values.model}
                  style={{
                    inputIOS: {
                      color: 'black',
                    },
                    inputAndroid: {
                      color: 'black',
                      fontSize: 14,
                      paddingHorizontal: 2,
                      paddingVertical: 8,
                      fontStyle: '100',
                    },
                    placeholder: {
                      color: '#A1A1AA',
                      fontStyle: '100',
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      margin={2}
                      size={4}
                      zIndex={-1}
                    />
                  )}
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
                <SelectComponent
                  placeholder={{
                    label: 'Ano do veículo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={VEHICLES_YEAR.map((item, index) => ({
                    label: item,
                    value: index,
                  }))}
                  onValueChange={e => setFieldValue('year', e)}
                  value={values.year}
                  style={{
                    inputIOS: {
                      color: 'black',
                    },
                    inputAndroid: {
                      color: 'black',
                      fontSize: 14,
                      paddingHorizontal: 2,
                      paddingVertical: 8,
                      fontStyle: '100',
                    },
                    placeholder: {
                      color: '#A1A1AA',
                      fontStyle: '100',
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      margin={2}
                      size={4}
                      zIndex={-1}
                    />
                  )}
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
                <SelectComponent
                  placeholder={{
                    label: 'Cor do veículo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={VEHICLES_COLOR.map((item, index) => ({
                    label: item,
                    value: index,
                  }))}
                  onValueChange={e => setFieldValue('color', e)}
                  value={values.color}
                  style={{
                    inputIOS: {
                      color: 'black',
                    },
                    inputAndroid: {
                      color: 'black',
                      fontSize: 14,
                      paddingHorizontal: 2,
                      paddingVertical: 8,
                      fontStyle: '100',
                    },
                    placeholder: {
                      color: '#A1A1AA',
                      fontStyle: '100',
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Icon
                      as={<MaterialIcons name="directions-car" />}
                      margin={2}
                      size={4}
                      zIndex={-1}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.color}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!(errors.isRented && touched.isRented)}
              >
                <FormControl.Label>Alugado</FormControl.Label>
                <Box
                  flexDirection={'row'}
                  flex={1}
                >
                  <Switch
                    size={'md'}
                    m={0}
                    p={0}
                    onToggle={value => setFieldValue('isRented', value)}
                    value={values.isRented}
                    colorScheme={'primary'}
                  />
                </Box>
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