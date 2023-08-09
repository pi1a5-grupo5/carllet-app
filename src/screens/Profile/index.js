import React from 'react';
import {
  PageContainer, MenuGroup, ProfileCard,
} from '../../components';
import {MaterialIcons} from '@expo/vector-icons';
import {
  ScrollView, useToast,
} from 'native-base';

import {useUserContext} from '../../hooks/useUserContext';
import ToastAlert from '../../components/atoms/Alert';

const Profile = ({navigation}) => {
  const toast = useToast();
  const {user, handleLogout} = useUserContext();

  const {email, name} = user;

  const handleMVPInformation = () => {
    return toast.show(
        {
          placement: 'top-left',
          render: ({id}) => {
            return (
              <ToastAlert
                id={id}
                {
                  ...{
                    title: 'MVP',
                    variant: 'left-accent',
                    description: 'Nossa pagina está em desenvolvimento, em breve teremos novidades!',
                    isClosable: false,
                    placement: 'top',
                  }
                } />
            );
          },
        });
  };

  const MENU_ITEMS = [
    {
      title: 'Minha Conta',
      description: 'Gerencie suas informações',
      onPress: () => navigation.navigate('Account'),
      iconAs: MaterialIcons,
      iconName: 'person',
    },

    {
      title: 'Sair',
      description: 'Desconecte-se da sua conta',
      onPress: () => onSignOut(),
      iconAs: MaterialIcons,
      iconName: 'logout',
    },
  ];

  const MORE_MENU_ITEMS = [
    {
      title: 'Sobre',
      description: 'Saiba mais sobre o aplicativo',
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'info',
    },

    {
      title: 'Ajuda',
      description: 'Precisa de ajuda?',
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'help',
    },

    {
      title: 'Termos de Uso',
      description: 'Leia os termos de uso',
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'description',
    },

    {
      title: 'Política de Privacidade',
      description: 'Leia a política de privacidade',
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'privacy-tip',
    },

  ];

  const onSignOut = () => {
    handleLogout();
  };


  return (
    <PageContainer
      pageTitle={'Perfil'}
    >
      <ProfileCard
        name={name}
        email={email}
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: 60}}
      >
        <MenuGroup
          items={MENU_ITEMS}
        />
        <MenuGroup
          title={'Mais'}
          items={MORE_MENU_ITEMS}
        />
      </ScrollView>
    </PageContainer>
  );
};

export default Profile;
