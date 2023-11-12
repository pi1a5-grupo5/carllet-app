import React from 'react'
import { Box, Text } from 'native-base'

const CustomDivider = ({
  title,
  ...props
}) => {
  return (
    <Box
      flex={1}
      flexDirection='row'
      alignItems='center'
      justifyContent={'space-between'}
      my={2}
      gap={5}
      {...props}
    >
      <Box
        flex={1}
        borderBottomWidth={1}
        borderBottomColor='gray.400'
      />
      {title && (
        <Text>
          {title}
        </Text>
      )}
      <Box
        flex={1}
        borderBottomWidth={1}
        borderBottomColor='gray.400'
      />
    </Box>
  )
}

export default CustomDivider