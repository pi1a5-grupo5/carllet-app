import { View, Image } from 'react-native'
import React from 'react'
import { Box, Avatar, Text } from 'native-base'
import ProfileImage from '../../../../assets/profile.webp'

const ProfileImageUri = Image.resolveAssetSource(ProfileImage).uri

const ProfileCard = ({
  name = 'Pedro Lima',
  email = 'pedrohblima03@gmail.com',
  avatar = ProfileImageUri
}) => {
  return (
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      gap={5}
      p={5}
      bg={'primary.700'}
      borderRadius={8}
      shadow={8}
      marginBottom={8}
    >
      <Box>
        <Avatar
          size={'lg'}
          source={{ uri: avatar }}
          borderWidth={2}
          borderColor={'white'}
          background={'primary.100'}
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