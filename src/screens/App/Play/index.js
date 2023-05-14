import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Button } from 'native-base'

const Play = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Play</Text>
      <Button 
        onPress={() => navigation.navigate('Home')}
      >
        Teste
      </Button>
    </SafeAreaView>
  )
}

export default Play