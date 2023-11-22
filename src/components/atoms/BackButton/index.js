import React from 'react';
import {
  Box, Button, Text,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const BackButton = ({ navigation, title, rightButton }) => {
  const { t } = useTranslation();

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      width={'100%'}
      marginBottom={4}
    >
      <Box
        style={{
          position: 'absolute',
          zIndex: 2,
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
          {t('pages.buttons.back')}
        </Button>
      </Box>

      {title && (
        <Box
          width={'100%'}
        >
          <Text
            textAlign={'center'}
            fontSize={16}
            fontWeight={'bold'}
          >
            {title}
          </Text>
        </Box>
      )}
      
      {rightButton && (
        <Box
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 2,
          }}
        >
          {rightButton}
        </Box>
      )}
    </Box>
  );
};

export default BackButton;
