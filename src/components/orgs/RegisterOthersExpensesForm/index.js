import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormControl, Stack, TextArea, Input, Icon, Button, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { DatePickerInput } from '../../';
import { OTHER_MAINTENANCE_TYPE, VEHICLES_MODEL } from '../../../constants/lorem.constants';
import SelectComponent from '../../mols/SelectInput';
import { ExpenseService } from '../../../services/expense.service';
import { openToast } from '../../../utils/openToast';
import { useUserVehicleContext } from '../../../contexts/UserVehiclesContex';
import { useTranslation } from 'react-i18next';

const RegisterOthersExpensesForm = ({ navigation }) => {
  const [otherExpensesTypes, setOtherExpensesTypes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userVehicles } = useUserVehicleContext();
  const {t} = useTranslation();

  const registerEarningValidationSchema = Yup.object().shape({
    userVehicleId: Yup
      .string()
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


  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    const {
      userVehicleId,
      otherExpenseDate,
      otherExpenseValue,
      otherExpenseDetails,
      otherExpensesTyped,
    } = values;

    try {
      const registerOtherExpense = await ExpenseService.registerOtherMaintenanceExpense({
        userVehicleId,
        expenseDate: otherExpenseDate,
        value: otherExpenseValue,
        details: otherExpenseDetails,
        otherTypeName: otherExpensesTyped,
      });

      if (!registerOtherExpense) {
        openToast({
          title: 'Erro ao registrar despesa',
          status: 'error',
          description: 'Tente novamente mais tarde',
        });
        return;
      }

      openToast({
        title: 'Despesa registrada com sucesso',
        status: 'success',
        description: 'Despesa registrada com sucesso',
      });

    } catch(error) {
      console.error(error);
      openToast({
        title: 'Erro ao registrar despesa',
        status: 'error',
        description: 'Tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };
  const getOtherExpenseTypes = async () => {
    try {
      const otherExpenseTypes = await ExpenseService.getOtherMaintenanceExpenseTypes();

      if (!otherExpenseTypes || otherExpenseTypes.length === 0) {
        openToast({
          title: 'Erro ao buscar tipos de despesas',
          status: 'error',
          description: 'Tente novamente mais tarde',
        });
        return [];
      }

      return otherExpenseTypes
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
    getOtherExpenseTypes()
      .then((res) => {
        setOtherExpensesTypes(res);
      })
      .catch((err) => {
        console.log(err);
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
          otherExpenseDate: '',
          otherExpenseValue: '',
          otherExpenseDetails: '',
          otherExpensesTyped: '',
        }}
        validationSchema={registerEarningValidationSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          console.log(values);
        }}
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
                  items={VEHICLES_MODEL.map((item, index) => ({
                    label: item,
                    value: index,
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
                  {errors.userVehicleId}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.otherExpenseDate && touched.otherExpenseDate)}
              >
                <DatePickerInput
                  placeholder="Data"
                  value={values.otherExpenseDate}
                  onChange={setFieldValue}
                  editable={false}
                  name={'otherExpenseDate'}
                  pickerStylesIOS={styles.datePickerIOS}
                />
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
                <SelectComponent
                  placeholder={{
                    label: 'Outras despesas',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={OTHER_MAINTENANCE_TYPE.map((item, index) => ({
                    label: item,
                    value: index,
                  }))}
                  onValueChange={(e) => setFieldValue('otherExpensesTyped', e)}
                  value={values.otherExpensesTyped}
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

export default RegisterOthersExpensesForm;
