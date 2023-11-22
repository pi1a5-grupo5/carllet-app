import { View, Image } from 'react-native';
import React from 'react';
import {
  Box, Avatar, Text, Button, Icon,
} from 'native-base';
import { useUserContext } from '../../../hooks/useUserContext';
import { AVATAR_OBJECT } from '../../../constants/avatars.constants';
import { SelectAvatar } from '../../index';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileCard = ({
  name = 'Desconhecido',
  email = 'naodefinido@email.com',
  avatar = 'avatar_masc_1',
  isVertical = false,
  bgColor = 'primary.700',
  avatarSize = 'lg',
  shadow = 8,
  nameColor = 'white',
  emailColor = 'gray.200',
  textCenter,
  selectAvatarPermission = false,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
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
        <Box
          position={'relative'}
        >
          <Button
            variant={'unstyled'}
            isDisabled={!selectAvatarPermission}
            _disabled={{
              opacity: 1,
            }}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Avatar
              size={avatarSize}
              source={{
                uri: AVATAR_OBJECT[avatar].uri,
              }}
              borderWidth={2}
              borderColor={'white'}
              background={'primary.100'}
            >
              {selectAvatarPermission && (
                <Avatar.Badge
                  bg={'gray.50'}
                  position={'absolute'}
                  flex={1}
                >
                  <Box
                    flex={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Icon
                      as={<MaterialIcons name="edit" />}
                    />
                  </Box>
                </Avatar.Badge>
              )}
            </Avatar>
          </Button>
        </Box>
        <View>
          {name && (
            <Text
              color={nameColor}
              fontWeight={'bold'}
              fontSize={isVertical ? 'md' : 'sm'}
              textTransform={'uppercase'}
              {...(textCenter && { textAlign: 'center' })}
              {...(isVertical && { paddingBottom: 2 })}
            >{name}</Text>
          )}
          {email && (
            <Text
              color={emailColor}
              fontWeight={'thin'}
              fontSize={'sm'}
            >{email}</Text>
          )}
        </View>
      </Box>

      {
        selectAvatarPermission && (
          <SelectAvatar
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        )
      }
    </>
  );
};

export default ProfileCard;
