import React from 'react'
import { MenuItem, PageContainer, MenuGroup, ProfileCard } from '../../components'
import { MaterialIcons } from '@expo/vector-icons'
import { ScrollView, Text } from 'native-base'

import { useUserContext } from '../../hooks/useUserContext'

const Profile = ({ navigation }) => {

  const { setIsLogged } = useUserContext();

  const MENU_ITEMS = [
    { title: 'Minha Conta', description: 'Gerencie suas informações', onPress: () => console.log('Account Page'), iconAs: MaterialIcons, iconName: 'person' },

    { title: 'Sair', description: 'Desconecte-se da sua conta', onPress: () => onSignOut, iconAs: MaterialIcons, iconName: 'logout' }
  ]

  const MORE_MENU_ITEMS = [
    { title: 'Sobre', description: 'Saiba mais sobre o aplicativo', onPress: () => console.log('About Page'), iconAs: MaterialIcons, iconName: 'info' },

    { title: 'Ajuda', description: 'Precisa de ajuda?', onPress: () => console.log('Help Page'), iconAs: MaterialIcons, iconName: 'help' },

    { title: 'Termos de Uso', description: 'Leia os termos de uso', onPress: () => console.log('Terms Page'), iconAs: MaterialIcons, iconName: 'description' },

    { title: 'Política de Privacidade', description: 'Leia a política de privacidade', onPress: () => console.log('Privacy Page'), iconAs: MaterialIcons, iconName: 'privacy-tip' }

  ]

  const onSignOut = () => {
    setIsLogged(false);

    navigation.navigate('SignIn');
  }



  return (
    <PageContainer
      pageTitle={'Perfil'}
    >
      <ProfileCard />
      <ScrollView>
        <MenuGroup
          items={MENU_ITEMS}
        />
        <MenuGroup
          title={'Mais'}
          items={MORE_MENU_ITEMS}
        />
      </ScrollView>
    </PageContainer>
  )
}

export default Profile