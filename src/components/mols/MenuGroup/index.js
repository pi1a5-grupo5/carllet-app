import {Box, Text} from 'native-base';
import React from 'react';
import {MenuItem} from '../../atoms';
import {useTranslation} from 'react-i18next';

const MenuGroup = ({
  title,
  items,
  customItem,
}) => {

  const { t } = useTranslation();

  return (
    <>
      {title && (
        <Text
          color={'dark.300'}
          fontWeight={'bold'}
          fontSize={'sm'}
          textTransform={'uppercase'}
          mb={2}
        >
          {t(title)}
        </Text>
      )}
      <Box
        padding={2}
        borderRadius={8}
        bg={'light.50'}
        shadow={1}
        marginBottom={5}
      >
        {items?.length > 0 && items.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
          />
        ))}
      </Box>
    </>
  );
};

export default MenuGroup;
