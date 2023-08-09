import {View} from 'react-native';
import {
  Box, Icon, Pressable, Text,
} from 'native-base';
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import React from 'react';

const MenuItem = ({
  iconAs = MaterialIcons,
  iconName = 'person',
  title = 'Minha Conta',
  description = 'Gerencie suas informações',
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
    >
      <Box
        flexDirection={'row'}
        alignItems={'center'}
        gap={5}
        p={5}
        borderRadius={8}
      >
        <Box
          bg={'primary.100'}
          p={2}
          borderRadius={'full'}
        >
          <Icon
            as={iconAs}
            size={'md'}
            name={iconName}
            color={'white'}
          />
        </Box>
        <View>
          <Text
            color={'dark.300'}
            fontWeight={'bold'}
            fontSize={'sm'}
            textTransform={'uppercase'}
          >
            {title}
          </Text>
          <Text
            color={'gray.400'}
            fontWeight={'thin'}
            fontSize={'sm'}
          >
            {description}
          </Text>
        </View>
        <Box
          flex={1}
          alignItems={'flex-end'}
        >
          <Icon
            as={Entypo}
            size={'lg'}
            name={'chevron-right'}
            color={'gray.400'}
          />
        </Box>
      </Box>
    </Pressable>
  );
};

export default MenuItem;
