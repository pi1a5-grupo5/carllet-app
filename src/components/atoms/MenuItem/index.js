import {View} from 'react-native';
import {
  Box, Icon, Pressable, Text,
} from 'native-base';
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import React from 'react';
import {useTranslation} from 'react-i18next';

const MenuItem = ({
  iconAs = MaterialIcons,
  iconName = 'person',
  title = 'Minha Conta',
  description = 'Gerencie suas informações',
  onPress,
}) => {
  const {t} = useTranslation();

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
            {t(title)}
          </Text>
          <Text
            color={'gray.400'}
            fontWeight={'thin'}
            fontSize={'sm'}
          >
            {t(description)}
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
