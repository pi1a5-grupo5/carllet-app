import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { BackButton, PageContainer } from '../../components'

const VehicleDetails = ({ navigation, id }) => {

  useEffect(() => {
    console.log('VehicleDetails id', id)
  }, [])
  

  return (
    <PageContainer>
      <BackButton navigation={navigation} />
      <Text>VehicleDetails</Text>
    </PageContainer>
  )
}

export default VehicleDetails