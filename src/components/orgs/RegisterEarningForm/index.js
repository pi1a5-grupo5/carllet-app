import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormControl, Stack, TextArea, Input, Icon, Button, Box } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import DatePickerInput from '../../mols/DatePickerInput'
import { useUserContext } from '../../../hooks/useUserContext'
import { EarningService } from '../../../services/earning.service'
import { openToast } from '../../../utils/openToast'
import { toFloat } from '../../../utils/currencyFormart'


const RegisterEarningForm = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const { user } = useUserContext();

  const registerEarningValidationSchema = Yup.object().shape({
    earningDate: Yup
      .string()
      .required('Campo obrigatório'),
    earningValue: Yup
      .string()
      .required('Campo obrigatório')
  })

  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    try {
      const { earningDate, earningValue } = values;
      console.log(registeredEarning)

      const registeredEarning = await EarningService.registerEarning({
        ownerId: user.id,
        earningValue: toFloat(earningValue, 'R$ '),
        insertionDateTime: earningDate,
      });


      if (registeredEarning) {
        openToast({
          status: 'success',
          title: 'Sucesso',
          description: 'Ganho registrado com sucesso',
        });
      }

      if (!registeredEarning) {
        openToast({
          status: 'warning',
          title: 'Erro',
          description: 'Não foi possível registrar o ganho',
        });
      }

      setIsLoading(false);
    } catch (error) {
      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Nao conseguimos completar a sua requisicao. Tente novamente mais tarde.',
      });

      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box>
      <Formik
        initialValues={{
          earningDate: new Date(),
          earningValue: 0,
        }}
        validationSchema={registerEarningValidationSchema}
        onSubmit={values => handleFormSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
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
                <DatePickerInput
                  placeholder="Data"
                  value={values.earningDate}
                  onChange={setFieldValue}
                  editable={false}
                  name={'earningDate'}
                  pickerStylesIOS={styles.datePickerIOS}
                />
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.earningValue && touched.earningValue)}
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
                      suffixUnit: ''
                    }}
                    value={values.earningValue}
                    onChangeText={handleChange('earningValue')}
                    onBlur={handleBlur('earningValue')}
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
                  {errors.earningValue}
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
    </Box>
  )
}

const styles = StyleSheet.create({
  datePickerIOS: {
    position: 'absolute',
    top: Dimensions.get('window').height - 400,
    padding: 10,
    left: -25,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default RegisterEarningForm