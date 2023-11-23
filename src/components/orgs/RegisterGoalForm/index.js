import { View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormControl, Stack, Icon, Button, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { useUserContext } from '../../../hooks/useUserContext';
import { openToast } from '../../../utils/openToast';
import { toFloat } from '../../../utils/currencyFormart';
import { GoalService } from '../../../services/goal.service';
import { useTranslation } from 'react-i18next';

const RegisterGoalForm = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setTodayGoal } = useUserContext();
  const { t } = useTranslation();


  const registerEarningValidationSchema = Yup.object().shape({
    goalValue: Yup
      .string()
      .required('Campo obrigatório'),
  });

  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    try {
      const { goalValue } = values;

      const registeredGoal = await GoalService.registerGoal({
        userId: user.id,
        goalValue: toFloat(goalValue, 'R$ '),
      });

      if (registeredGoal) {
        openToast({
          status: 'success',
          title: 'Sucesso',
          description: 'Meta registrada com sucesso',
        });

        setTodayGoal(toFloat(goalValue, 'R$ '));

        return navigation.goBack();
      }

      if (!registeredGoal) {
        openToast({
          status: 'warning',
          title: 'Erro',
          description: 'Não foi possível registrar a sua meta',
        });
      }
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
  };

  return (
    <Box>
      <Formik
        initialValues={{
          goalValue: 0,
        }}
        validationSchema={registerEarningValidationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
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
                isInvalid={!!(errors.goalValue && touched.goalValue)}
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
                    value={values.goalValue}
                    onChangeText={handleChange('goalValue')}
                    onBlur={handleBlur('goalValue')}
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
                  {errors.goalValue}
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
                {t("pages.home.screenItems.registerGoal")}
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
          </View>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterGoalForm;
