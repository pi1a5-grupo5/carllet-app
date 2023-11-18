import React from 'react'
import { useLangContext } from '../../../contexts/LangContext';
import { Avatar, Box, Button, Icon, Text } from 'native-base';
import i18 from '../../../lang';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const LanguageSelector = ({ onChangeLang }) => {
  const { language, handleLang } = useLangContext();

  const changeLanguage = (lang) => {
    i18.changeLanguage(lang);
    handleLang(lang);
    onChangeLang?.();
  }

  return (
    <Box
      padding={5}
      borderRadius={8}
      bg={'light.50'}
      shadow={1}
      margin={10}
      width={Dimensions.get('window').width - 20}
    >
      <Text
        color={'dark.300'}
        fontWeight={'bold'}
        fontSize={'lg'}
        textTransform={'uppercase'}
        mb={5}
      >
        Selecione o idioma
      </Text>
      <Box
        flexDirection={'row'}
        gap={5}
      >
        <Button
          onPress={() => changeLanguage('ptBr')}
          variant={language === 'ptBr' ? 'solid' : 'outline'}
          colorScheme={'primary'}
          size={'sm'}
          flex={language === 'ptBr' ? 1 : 0}
        >
          <Box
            flex={1}
          >
            <Avatar
              size={'sm'}
              source={require('../../../../assets/flags/br.png')}
            />
          </Box>
        </Button>
        <Button
          onPress={() => changeLanguage('enUs')}
          variant={language === 'enUs' ? 'solid' : 'outline'}
          colorScheme={'primary'}
          size={'sm'}
          flex={language === 'enUs' ? 1 : 0}
          _text={{
            alignItems: 'flex-start'
          }}
        >
          <Avatar
            size={'sm'}
            source={require('../../../../assets/flags/us.png')}
          />
        </Button>
      </Box>
    </Box>
  )
}

export default LanguageSelector