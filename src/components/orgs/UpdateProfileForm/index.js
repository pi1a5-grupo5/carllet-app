import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Button, Icon, Input, Stack, FormControl, Box, Modal, Text,
} from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserService } from '../../../services/user.service';
import { openToast } from '../../../utils/openToast';
import { useUserContext } from '../../../hooks/useUserContext';

const UpdateProfileForm = ({ navigation }) => {
  const { user, handleLogout } = useUserContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const validationSchema = Yup.object().shape({
    cnh: Yup.string(),
    dateOfBirth: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    try {
      const deleteUser = await UserService.deleteUser(user.id);

      if (deleteUser) {
        openToast({
          status: 'success',
          description: 'Conta deletada com sucesso!',
          duration: 3000,
          position: 'top',
          title: 'Sucesso',
        });

        if (!deleteUser) {
          openToast({
            status: 'error',
            description: 'Erro ao deletar conta!',
            duration: 3000,
            position: 'top',
            title: 'Erro',
          });
        }

        handleLogout();
      }
    } catch (error) {
      openToast({
        status: 'error',
        description: 'Erro ao deletar conta!',
        duration: 3000,
        position: 'top',
        title: 'Erro',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfileSubmit = async (values) => {
    setIsLoading(true);
    const { password } = values;

    try {
      const updateUser = await UserService.updateUser(user.id, {
        id: user.id,
        name: user.name,
        email: user.email,
        password: password,
      });

      if (updateUser) {
        openToast({
          status: 'success',
          description: 'Senha atualizada com sucesso!',
          duration: 3000,
          position: 'top',
          title: 'Sucesso',
        });
      }

      if (!updateUser) {
        openToast({
          status: 'error',
          description: 'Erro ao atualizar senha!',
          duration: 3000,
          position: 'top',
          title: 'Erro',
        });
      }
    } catch (error) {
      openToast({
        status: 'error',
        description: 'Erro ao atualizar senha!',
        duration: 3000,
        position: 'top',
        title: 'Erro',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      flex={1}
    >
      <Formik
        initialValues={{
          password: '',
          confirmPassowrd: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleUpdateProfileSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <Box
            height={'full'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Stack
              space={4}
              alignItems="center"
              width={'100%'}
            >
              <FormControl
                isRequired
                isInvalid={!!(errors.password && touched.password)}
              >
                <Input
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  size={'md'}
                  placeholder="Senha"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="lock" />} marginLeft={2} />
                  }
                  type='password'
                  value={values.password}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!(errors.confirmPassowrd && touched.confirmPassowrd)}
              >
                <Input
                  onChangeText={handleChange('confirmPassowrd')}
                  onBlur={handleBlur('confirmPassowrd')}
                  size={'md'}
                  placeholder="Confirme sua senha"
                  variant="outline"
                  width={'100%'}
                  InputLeftElement={
                    <Icon as={<MaterialIcons name="lock" />} marginLeft={2} />
                  }
                  type='password'
                  value={values.email}
                />
                <FormControl.ErrorMessage
                  leftIcon={<MaterialIcons name="error" size={16} color="red" />}
                >
                  {errors.confirmPassowrd}
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
                Atualizar dados
              </Button>
              <Button
                variant="solid"
                bgColor={'red.400'}
                _pressed={{ backgroundColor: 'red.600' }}
                marginTop={2}
                width={'100%'}
                onPress={() => setShowDeleteModal(true)}
              >
                Deletar conta
              </Button>
            </View>
          </Box>
        )}
      </Formik>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        borderRadius={8}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Deletar conta</Modal.Header>
          <Modal.Body>
            Tem certeza que deseja deletar sua conta? Você não poderá recuperar seus dados e essa acao é irreversível.
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" onPress={() => {
                setShowDeleteModal(false);
              }}>
                Cancelar
              </Button>
              <Button
                variant={'solid'}
                bgColor={'red.400'}
                onPress={handleDeleteAccount}
              >
                Deletar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default UpdateProfileForm;
