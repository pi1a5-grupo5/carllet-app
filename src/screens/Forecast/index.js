import React from 'react'
import { Box, ScrollView, Icon, Text } from 'native-base'
import { CardInformation, PageContainer } from '../../components'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '../../hooks/useUserContext'
import { currencyFormat } from '../../utils/currencyFormart'
import { Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const ForecastScreen = () => {
  const { t } = useTranslation()
  const { userPrevision } = useUserContext()

  return (
    <PageContainer
      pageTitle={t('menuItems.forecast')}
    >
      <ScrollView
        flex={1}
        height={'100%'}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 40 : 60,
        }}
      >
        <CardInformation
          title={t('pages.home.forecast.cardForecastTitle')}
          description={`${currencyFormat(userPrevision)}`}
          bg='info.100'
          icon={'star'}
        />

        <Box
          position={'relative'}
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          mt={4}
ß        >
          <Icon
            position={'absolute'}
            left={0}
            top={0.5}
            as={
              <MaterialIcons name="error" size={16} />
            }
            color='gray.400'
          />
          <Box>
            <Text
              fontSize='sm'
              paddingX={2}
              paddingLeft={8}
              color='gray.400'
            >
              {t('pages.home.forecast.forecastWarning')}
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </PageContainer>
  )
}

export default ForecastScreen