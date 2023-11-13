import {View} from 'react-native';
import React from 'react';
import {Box, Icon, Text} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';

const CardInformation = ({
  title,
  value,
  children,
  description,
  icon,
  iconColor = 'dark.50',
  iconSize = 10,
  ...props
}) => {
  return (
    <Box
      borderRadius="md"
      p={4}
      {...props}
    >
      <Text
        fontSize={{
          base: 'sm',
          sm: 'md',
          md: 'xl',
        }}
        fontWeight='bold'
        pb={2}
      >{title}</Text>
      <Box
        flex={1}
        flexDirection='row'
        alignItems='center'
        justifyContent={'space-between'}
      >
        {icon && (
          <Icon
            as={MaterialIcons}
            name={icon}
            size={iconSize}
            mr={2}
            color={iconColor}
          />
        )}

        {description && (
          <Text
            fontSize={{
              base: 'sm',
              sm: 'md',
              md: 'xl',
            }}
            fontWeight='bold'
            py={2}
          >{description}</Text>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default CardInformation;
