import { View, Text } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          fontSize: 50,
          fontWeight: 'bold',
          color: 'primary.500'
        }}
      >CARLLET</Text>
    </View>
  )
}

export default Logo