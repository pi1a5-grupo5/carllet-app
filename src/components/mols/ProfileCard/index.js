import { View } from 'react-native'
import React from 'react'
import { Box, Avatar, Text } from 'native-base'

const ProfileCard = ({
  name = 'Pedro Lima',
  email = 'pedrohblima03@gmail.com',
  avatar
}) => {
  return (
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      gap={5}
      p={5}
      bg={'primary.700'}
      borderRadius={8}
    >
      <Box>
        <Avatar
          size={'lg'}
          source={{ uri: avatar }}
          borderWidth={2}
          borderColor={'white'}
        />
      </Box>
      <View>
        {name && (
          <Text
            color={"white"}
            fontWeight={"bold"}
            fontSize={"sm"}
            textTransform={'uppercase'}
          >{name}</Text>
        )}
        {email && (
          <Text
            color={"gray.200"}
            fontWeight={"thin"}
            fontSize={"sm"}
          >{email}</Text>
        )}
      </View>
    </Box>
  )
}

export default ProfileCard