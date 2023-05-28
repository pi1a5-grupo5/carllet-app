import { View } from 'react-native'
import React from 'react'
import { Icon, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

const Development = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        fontSize='xl'
        fontWeight='bold'
      >Funcionalidade em desenvolvimento</Text>
      <Icon 
        as={Ionicons}
        name="construct-outline"
        size="2xl"
        color="primary.500"
        mt={4}
      />
    </View>
  )
}

export default Development