import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'native-base'
import React from 'react'

const PageContainer = ({ 
  isSafe = true, 
  isFullScreen = false,
  pageTitle = '',
  children 
}) => {

  const Container = isSafe ? SafeAreaView : View

  return (
    <Container
      style={{
        padding: isFullScreen ? 0 : 20,
        flex: 1
      }}
    >
      {pageTitle && (
        <Text
        mb={4}
        fontSize={'xl'}
        fontWeight={'bold'}
        >{pageTitle}</Text>
      )}
      {children}
    </Container>
  )
}

export default PageContainer