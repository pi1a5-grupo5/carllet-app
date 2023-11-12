import React from 'react'
import { Box, Icon, Text } from 'native-base'
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'

const CourseCard = ({ course, lastChild, ...props }) => {
  return (
    <Box
      key={course.id}
      borderRadius={10}
      px={4}
      flex={1}
      {...props}
    >
      <Box
        flex={1}
        flexDirection="row"
        alignItems={'center'}
        py={2}
      >
        {/* Card icon */}
        <Box
          width={12}
          height={12}
        >
          <Box
            rounded="full"
            bg='primary.500'
            width={12}
            height={12}
            flex={1}
            alignItems='center'
            justifyContent='center'
          >
            <Box
              size={6}
              marginLeft={-1}
            >
              <Icon
                as={FontAwesome5}
                name="road"
                color={'white'}
                size={6}
                style={{ width: '115%' }}
              />
            </Box>
          </Box>
        </Box>

        {/* Card Infos */}
        <Box
          marginLeft={4}
          flex={1}
        >
          <Box
            flex={1}
            gap={2}
          >
            <Box
              flex={1}
              flexDirection={'row'}
              alignItems={'center'}
              gap={4}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="map-marker-distance"
                size={4}
                color={'gray.500'}
              />
              <Text
                fontSize='sm'
                color={'gray.500'}
              >
                {course.courseLength} km
              </Text>
            </Box>
            <Box
              flex={1}
              flexDirection={'row'}
              alignItems={'center'}
              gap={4}
            >
              <Icon
                as={MaterialIcons}
                name="date-range"
                size={4}
                color={'gray.500'}
              />
              <Text
                fontSize='sm'
                color={'gray.500'}
              >
                {dayjs(course.courseEndTime).format('DD/MM/YYYY HH:mm')}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      {!lastChild && (
        <Box
          flex={1}
          borderBottomWidth={1}
          borderBottomColor='gray.400'
          marginLeft={16}
          paddingTop={2}
        />
      )}
    </Box>
  )
}

export default CourseCard