import { View } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

const BackButton = ({ navigation }) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20
      }}
    >
      <Button
        padding={1}
        variant="ghost"
        colorScheme="black"
        onPress={() => navigation.goBack()}
        startIcon={
          <AntDesign
            name="arrowleft"
            size={16}
            color="#000"
          />
        }
      >
        Voltar
      </Button>
    </View>
  )
}

export default BackButton