import React from 'react'
import { ScrollView, Text } from 'native-base'
import { BackButton, PageContainer } from '../../components'
import { useUserContext } from '../../hooks/useUserContext'

const HomeScreen = ({ navigation }) => {

  const { user } = useUserContext();

  return (
    <PageContainer
    >
      <ScrollView>
        <Text
          fontSize='xl'
          fontWeight='bold'
        >Bem vindo, {user?.name ?? 'usuário'}.</Text>
      </ScrollView>
    </PageContainer>
  )
}

export default HomeScreen