import { Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base'
import { BackButton, PageContainer } from '../../components'

const HomeScreen = ({ navigation }) => {
  return (
    <PageContainer>
      <BackButton
        navigation={navigation}
      />
      <ScrollView>
        <Text>Home</Text>
        <Text>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </Text>
      </ScrollView>
    </PageContainer>
  )
}

export default HomeScreen