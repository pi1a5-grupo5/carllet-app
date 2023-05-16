import { View } from 'react-native'
import { Box, Text } from 'native-base'
import React from 'react'
import { MenuItem } from '../../atoms'

const MenuGroup = ({
  title,
  items
}) => {
  return (
    <>
      {title && (
        <Text
          color={"dark.300"}
          fontWeight={"bold"}
          fontSize={"sm"}
          textTransform={'uppercase'}
          mb={2}
        >
          {title}
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
  )

}

export default MenuGroup