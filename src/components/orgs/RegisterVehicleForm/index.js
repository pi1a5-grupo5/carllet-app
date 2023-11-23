import {View, Text, Platform} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormControl, Stack, Input, Icon, Button, Switch, ScrollView, Box} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {VEHICLES_COLOR, VEHICLES_YEAR} from '../../../constants/lorem.constants';
import SelectComponent from '../../mols/SelectInput';
import {openToast} from '../../../utils/openToast';
import {UserContext} from '../../../contexts/UserContext';

import {VehiclesService} from '../../../services/vehicles.service';
import {useTranslation} from 'react-i18next';
import { useUserVehicleContext } from '../../../contexts/UserVehiclesContex';

const RegisterVehicleForm = ({navigation}) => {
  const [brandTypes, setbrandTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(UserContext);
  const {userVehicles, setUserVehicles} = useUserVehicleContext();
  const {t} = useTranslation();

  const registerVehicleValidationSchema = Yup.object().shape({
    make: Yup
        .number()
        .required('Campo obrigatório'),
    vehicleTypeId: Yup
        .number()
        .required('Campo obrigatório'),
    fabricationYear: Yup
        .number()
        .required('Campo obrigatório'),
    odometer: Yup
        .number()
        .required('Campo obrigatório'),
    color: Yup
        .string()
        .required('Campo obrigatório'),
    rented: Yup
        .boolean()
        .required('Campo obrigatório'),
  });

  const handleFormSubmit = async (values) => {
    const {make, vehicleTypeId, fabricationYear, odometer, color, rented} = values;

    setIsLoading(true);
    const vehicleTypeName = vehicleModels.filter((item) => item.vehicleTypeId === vehicleTypeId).shift().name;
    const vehicleBrandName = selectedBrand ? brandTypes.filter((item) => item.vehicleBrandId === make).shift().name : null;
    const request = {
      vehicleTypeName,
      vehicleBrandName,
      vehicleTypeId,
      fabricationYear,
      odometer,
      rented,
      userId: user.id,
      vehicleColor: color,
    };

    console.log(request)

    try {
      const res = await VehiclesService.addNewVehicleFromUser(request);

      if (!res) {
        openToast({
          status: 'error',
          title: 'Erro',
          description: 'Não conseguimos registrar o veículo, tente novamente mais tarde.',
        });
        return;
      }

      openToast({
        status: 'success',
        title: 'Sucesso',
        description: 'Veículo registrado com sucesso.',
      });
      
      setUserVehicles([...userVehicles, res]);

      navigation.goBack();
    } catch (err) {
      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Não conseguimos registrar o veículo, tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getVehiclesBrands = async () => {
    try {
      const res = await VehiclesService.getVehiclesBrands();

      if (!res || res.length === 0) {
        openToast({
          status: 'error',
          title: 'Erro',
          description: 'Não conseguimos recuperar as fabricantes presentes em nosso sistema, tente novamente mais tarde.',
        });
        navigation.goBack();
      }

      setbrandTypes(res);
    } catch (err) {
      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Não conseguimos recuperar as fabricantes presentes em nosso sistema, tente novamente mais tarde.',
      });
      navigation.goBack();
    }
  };

  const getVehiclesTypesByBrand = async (brandId) => {
    try {
      const res = await VehiclesService.getVehiclesTypesByBrand(brandId);
      if (!res || res.length === 0) {
        openToast({
          status: 'error',
          title: 'Erro',
          description: 'Não conseguimos recuperar os modelos presentes em nosso sistema, tente novamente mais tarde.',
        });
        navigation.goBack();
      }
      setVehicleModels(res);
    } catch (err) {
      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Não conseguimos recuperar os modelos presentes em nosso sistema, tente novamente mais tarde.',
      });
      navigation.goBack();
    }
  };

  useEffect(() => {
    getVehiclesBrands();
  }, []);

  useEffect(() => {
    if (!selectedBrand) return;
    getVehiclesTypesByBrand(selectedBrand);
  }, [selectedBrand]);

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
          vehicleTypeId: '',
          fabricationYear: '',
          odometer: '',
          color: '',
          rented: false,
        }}
        validationSchema={registerVehicleValidationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue}) => (
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
                    label: 'Selecione o fabricante',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={brandTypes?.map((item, index) => ({
                    label: item.name,
                    value: item.vehicleBrandId,
                    key: index,
                  }))}
                  onValueChange={(e) => {
                    setFieldValue('make', e);
                    if(Platform.OS === 'android') {
                      setSelectedBrand(e);
                    }
                  }}
                  onDonePress={() => setSelectedBrand(values.make)}
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
                  {errors.make}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.vehicleTypeId && touched.vehicleTypeId)}
              >
                <FormControl.Label>Modelo</FormControl.Label>
                <SelectComponent
                  disabled={vehicleModels.length === 0 || (typeof values.make !== 'number' && !values.make)}
                  placeholder={{
                    label: 'Selecione o modelo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={vehicleModels.map((item, index) => ({
                    label: item.name,
                    value: item.vehicleTypeId,
                  }))}
                  onValueChange={(e) => setFieldValue('vehicleTypeId', e)}
                  value={values.vehicleTypeId}
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
                  {errors.vehicleTypeId}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.odometer && touched.odometer)}
              >
                <FormControl.Label>Odômetro</FormControl.Label>
                <Input
                  onChangeText={handleChange('odometer')}
                  onBlur={handleBlur('odometer')}
                  size={'md'}
                  placeholder="Odômetro"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="speed" />} marginLeft={2} />
                  }
                  type='number'
                  keyboardType='numeric'
                  value={values.odometer}
                  InputRightElement={
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#A1A1AA',
                        fontStyle: 'light',
                        marginRight: 10,
                      }}
                    >
                      KM
                    </Text>
                  }
                />
                <FormControl.ErrorMessage>
                  {errors.odometer}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!(errors.fabricationYear && touched.fabricationYear)}
              >
                <FormControl.Label>Ano</FormControl.Label>
                <SelectComponent
                  disabled={vehicleModels.length === 0 || (typeof values.vehicleTypeId !== 'number' && !values.vehicleTypeId)}
                  placeholder={{
                    label: 'Ano do veículo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={VEHICLES_YEAR.map((item, index) => ({
                    label: `${item}`,
                    value: item
                  }))}
                  onValueChange={(e) => setFieldValue('fabricationYear', e)}
                  value={values.fabricationYear}
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
                  {errors.fabricationYear}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.color && touched.color)}
              >
                <FormControl.Label>Cor</FormControl.Label>
                <SelectComponent
                  disabled={vehicleModels.length === 0 || (typeof values.vehicleTypeId !== 'number' && !values.vehicleTypeId)}
                  placeholder={{
                    label: 'Cor do veículo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  placeholderTextColor={'#A1A1AA'}
                  items={VEHICLES_COLOR.map((item, index) => ({
                    label: t(`${item.label}`),
                    value: item.value,
                  }))}
                  onValueChange={(e) => setFieldValue('color', e)}
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
                  {errors.color}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!(errors.rented && touched.rented)}
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
                    onToggle={(value) => setFieldValue('rented', value)}
                    value={values.rented}
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
                {t('pages.buttons.cancel')}
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegisterVehicleForm;
