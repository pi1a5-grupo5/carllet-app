import { View, Text } from 'react-native'
import React from 'react'
import { BackButton, PageContainer, RegisterVehicleForm } from '../../components'

const NewVehiclePage = ({ navigation }) => {
  return (
    <PageContainer>
      <BackButton navigation={navigation} title="Novo veículo"/>
      <RegisterVehicleForm navigation={navigation} />
    </PageContainer>
  )
}

export default NewVehiclePage