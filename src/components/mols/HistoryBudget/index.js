import React from 'react';
import { Box, FlatList, ScrollView, Text } from 'native-base';
import dayjs from 'dayjs';
import { currencyFormat } from '../../../utils/currencyFormart';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

const HistoryBudget = ({ title = 'Histórico', budgetItems = [] }) => {
  const { t } = useTranslation();

  return (
    <Box
      bg="white"
      p={4}
      mx={2}
      marginBottom={Platform.OS == 'android' ? -20 : -10}
      h="100%"
      rounded="lg"
      shadow={1}
    >
      <Text
        fontWeight="bold"
        fontSize="lg"
        mb={4}
      >{t(title)}</Text>

      <ScrollView>

        {budgetItems.length === 0 && (
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            height={'100%'}
            paddingY={20}
          >
            <Text
              textAlign={'center'}
            >{t('pages.home.screenItems.noBudgetFound')}</Text>
          </Box>
        )}

        {budgetItems.length > 0 && (
          <>
            {budgetItems.map((item, index) => (
              <Box
                key={index}
                flex={1}
                flexDirection="row"
              >
                <Box
                  position="relative"
                  w={100}
                  height={100}
                >
                  <Box
                    bg="primary.500"
                    rounded="full"
                    w={10}
                    h={10}
                  />
                  <Box
                    bg="primary.500"
                    position="absolute"
                    zIndex={99999}
                    bottom={75}
                    left={0}
                    w={'100%'}
                    h={1}
                  />

                  {!(index === budgetItems.length - 1) && (
                    <Box
                      bg="primary.500"
                      position="absolute"
                      top={0}
                      left={5}
                      w={1}
                      h={'100%'}
                    />
                  )}

                </Box>
                <Box
                  flex={1}
                  alignItems="center"
                >
                  <Box>
                    <Box
                      flexDirection="row"
                      gap={2}
                    // justifyContent="top"
                    >
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                      >{t(item.title)}</Text>
                      <Text
                        fontSize="md"
                      >-</Text>
                      <Text
                        fontSize="md"
                        fontStyle="light"
                      >{currencyFormat(item.value)}</Text>
                    </Box>
                    <Text
                      textAlign="left"
                      fontStyle="light"
                    >{dayjs(item.date).format('DD/MM/YYYY')}</Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        )}

      </ScrollView>
    </Box>
  );
};

export default HistoryBudget;
