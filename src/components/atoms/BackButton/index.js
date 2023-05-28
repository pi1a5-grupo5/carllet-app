import { View } from 'react-native'
import React from 'react'
import { Box, Button, Text } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

const BackButton = ({ navigation, title }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      marginBottom={4}
    >
      <Box
        style={{
          position: "absolute",
          zIndex: 2
        }}
      >
        <Button
          padding={1}
          variant="ghost"
          colorScheme="light"
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
      </Box>

      {title && (
        <Box
          width={"100%"}
        >
          <Text
            textAlign={"center"}
            fontSize={16}
            fontWeight={"bold"}
          >
            {title}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default BackButton