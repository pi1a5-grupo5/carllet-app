import React from 'react'
import { Box, ScrollView, Text } from 'native-base'
import dayjs from 'dayjs'
import { currencyFormat } from '../../../utils/currencyFormart'

const HistoryBudget = ({ title = "Histórico", budgetItems = [] }) => {
  return (
    <Box
      bg="white"
      p={4}
      mx={2}
      mb={-10}
      h="100%"
      rounded="lg"
      shadow={1}
    >
      <Text
        fontWeight="bold"
        fontSize="lg"
        mb={4}
      >{title}</Text>

      <ScrollView>
        {budgetItems.map((item, index) => (
          <Box
            key={index}
            flex={1}
            flexDirection="row"
            justifyContent="space-between"
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
                w={"100%"}
                h={1}
              />

              {!(index === budgetItems.length - 1) && (
                <Box
                  bg="primary.500"
                  position="absolute"
                  top={0}
                  left={5}
                  w={1}
                  h={"100%"}
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
                  justifyContent="top"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                  >{item.title}</Text>
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
      </ScrollView>
    </Box>
  )
}

export default HistoryBudget