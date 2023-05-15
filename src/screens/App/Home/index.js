import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { ScrollView } from 'native-base'
import { BackButton, PageContainer } from '../../../components'

const Home = ({ navigation }) => {
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

export default Home