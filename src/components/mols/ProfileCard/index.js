import { View, Image } from 'react-native'
import React from 'react'
import { Box, Avatar, Text } from 'native-base'
import ProfileImage from '../../../../assets/profile.webp'

const ProfileImageUri = Image.resolveAssetSource(ProfileImage).uri

const ProfileCard = ({
  name = 'Pedro Lima',
  email = 'pedrohblima03@gmail.com',
  avatar = ProfileImageUri,
  isVertical = false,
  bgColor = "primary.700",
  avatarSize = "lg",
  shadow = 8,
  nameColor = "white",
  emailColor = "gray.200",
  textCenter,
}) => {
  return (
    <Box
      flexDirection={isVertical ? 'column' : 'row'}
      alignItems={'center'}
      gap={5}
      p={5}
      bg={bgColor}
      borderRadius={8}
      shadow={shadow}
      marginBottom={8}
    >
      <Box>
        <Avatar
          size={avatarSize}
          source={{ uri: avatar }}
          borderWidth={2}
          borderColor={'white'}
          background={'primary.100'}
        />
      </Box>
      <View>
        {name && (
          <Text
            color={nameColor}
            fontWeight={"bold"}
            fontSize={isVertical ? "md" : "sm"}
            textTransform={'uppercase'}
            {...(textCenter && { textAlign: "center" })}
            {...(isVertical && { paddingBottom: 2 })}
          >{name}</Text>
        )}
        {email && (
          <Text
            color={emailColor}
            fontWeight={"thin"}
            fontSize={"sm"}
          >{email}</Text>
        )}
      </View>
    </Box>
  )
}

export default ProfileCard