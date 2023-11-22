import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormControl, Stack, TextArea, Input, Icon, Button, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { DatePickerInput } from '../../';
import SelectComponent from '../../mols/SelectInput';
import { useUserVehicleContext } from '../../../contexts/UserVehiclesContex';
import { TextInputMask } from 'react-native-masked-text';
import { ExpenseService } from '../../../services/expense.service';
import { openToast } from '../../../utils/openToast';
import { useTranslation } from 'react-i18next';
import { toFloat } from '../../../utils/currencyFormart';
import dayjs from 'dayjs';

const FuelExpenseForm = ({ navigation }) => {
  const [fuelTypes, setFuelTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userVehicles } = useUserVehicleContext();
  const { t } = useTranslation();

  const registerFuelValidationSchema = Yup.object().shape({
    userVehicleId: Yup
      .string()
      .required('Campo obrigatório'),
    expenseDate: Yup
      .string()
      .required('Campo obrigatório'),
    value: Yup
      .string()
      .required('Campo obrigatório'),
    fuelExpenseTypeId: Yup
      .string()
      .required('Campo obrigatório'),
    liters: Yup
      .string()
      .required('Campo obrigatório'),
  });

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    const {
      userVehicleId,
      expenseDate,
      value,
      liters,
      fuelExpenseTypeId
    } = values;

    try {
      const registeredFuelExpense = await ExpenseService.registerFuelExpense({
        userVehicleId,
        expenseDate: dayjs(expenseDate),
        value: toFloat(value, 'R$ '),
        liters: toFloat(liters, 'a'),
        fuelExpenseTypeId,
      });

      if (registeredFuelExpense) {
        openToast({
          status: 'success',
          title: 'Sucesso',
          description: 'Despesa registrada com sucesso',
        });
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };


  const getFuelExpenseTypes = async () => {
    try {
      const response = await ExpenseService.getFuelExpenseTypes();

      if (!response.length === 0 || !response) {
        openToast({
          title: 'Erro ao buscar tipos de despesas',
          status: 'error',
          description: 'Tente novamente mais tarde',
        });
        return [];
      }

      return response;
    } catch (error) {
      console.error(error);
      openToast({
        title: 'Erro ao buscar tipos de despesas',
        status: 'error',
        description: 'Tente novamente mais tarde',
      });
    }
  };

  useEffect(() => {
    getFuelExpenseTypes()
      .then((res) => {
        setFuelTypes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Box
      marginHorizontal={4}
      flex={1}
    >
      <Formik
        initialValues={{
          userVehicleId: '',
          expenseDate: new Date(),
          value: 0,
          liters: '',
          fuelExpenseTypeId: 0,
        }}
        validationSchema={registerFuelValidationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <ScrollView>
            <Stack
              space={4}
              width={'100%'}
              alignItems="center"
            >
              <FormControl
                isRequired
                isInvalid={!!(errors.userVehicleId && touched.userVehicleId)}
              >
                <SelectComponent
                  placeholder={{
                    label: 'Veículo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={userVehicles.map((item, index) => ({
                    label: `${item.vehicleBrandName} - ${item.vehicleTypeName}`,
                    value: item.userVehicleId,
                  }))}
                  onValueChange={(e) => setFieldValue('userVehicleId', e)}
                  value={values.userVehicleId}
                  style={{
                    inputIOS: {
                      color: 'black',
                    },
                    inputAndroid: {
                      color: 'black',
                      fontSize: 14,
                      paddingHorizontal: 2,
                      paddingVertical: 8,
                      fontStyle: 'light',
                    },
                    placeholder: {
                      color: '#A1A1AA',
                      fontStyle: 'light',
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
                  {errors.userVehicleId}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.expenseDate && touched.expenseDate)}
              >
                <DatePickerInput
                  placeholder="Data"
                  value={values.expenseDate}
                  onChange={setFieldValue}
                  editable={false}
                  name={'expenseDate'}
                  pickerStylesIOS={styles.datePickerIOS}
                />
                <FormControl.ErrorMessage>
                  {errors.expenseDate}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.value && touched.value)}
              >
                <Box
                  width={'100%'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  borderWidth={1}
                  borderRadius={5}
                  borderColor={'gray.300'}
                  padding={2}
                >
                  <Icon as={<MaterialIcons name="attach-money" />} marginRight={2} />
                  <TextInputMask
                    type={'money'}
                    options={{
                      precision: 2,
                      separator: ',',
                      delimiter: '.',
                      unit: 'R$ ',
                      suffixUnit: '',
                    }}
                    value={values.value}
                    onChangeText={handleChange('value')}
                    onBlur={handleBlur('value')}
                    size={'md'}
                    placeholder="Valor"
                    variant="outline"
                    width={'100%'}
                    InputLeftElement={
                      <Icon as={<MaterialIcons name="attach-money" />} marginLeft={2} />
                    }
                    keyboardType='numeric'
                  />
                </Box>
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.value}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.liters && touched.liters)}
              >
                <Input
                  placeholder="Litros"
                  value={values.liters}
                  onChangeText={handleChange('liters')}
                  onBlur={handleBlur('liters')}
                  size={'md'}
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="local-gas-station" />} marginLeft={2} />
                  }
                  keyboardType='numeric'
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.liters}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl>
                <SelectComponent
                  placeholder={{
                    label: 'Tipo de combustivel',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={fuelTypes.map((item, index) => ({
                    label: item.typeName,
                    value: item.typeId,
                  }))}
                  onValueChange={(e) => setFieldValue('fuelExpenseTypeId', e)}
                  value={values.fuelExpenseTypeId}
                  style={{
                    inputIOS: {
                      color: 'black',
                    },
                    inputAndroid: {
                      color: 'black',
                      fontSize: 14,
                      paddingHorizontal: 2,
                      paddingVertical: 8,
                      fontStyle: 'light',
                    },
                    placeholder: {
                      color: '#A1A1AA',
                      fontStyle: 'light',
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Icon
                      as={<MaterialIcons name="description" />}
                      margin={2}
                      size={4}
                      zIndex={-1}
                    />
                  )}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.fuelExpenseTypeId}
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
                {t('pages.home.controlTab.expense.send')}
              </Button>
              <Button
                variant="ghost"
                colorScheme="primary"
                marginTop={2}
                width={'100%'}
                onPress={() => navigation.goBack()}
              >
                {t('pages.buttons.cancel')}
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </Box>
  );
};

const styles = StyleSheet.create({
  datePickerIOS: {
    position: 'absolute',
    zIndex: 10,
    top: Dimensions.get('window').height / 2 - 100,
    padding: 10,
    right: -20,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FuelExpenseForm;
