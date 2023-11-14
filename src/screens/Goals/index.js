import { View, Text } from 'react-native'
import React from 'react'
import { PageContainer, RegisterGoalForm, BackButton } from '../../components'

const GoalsScreen = ({ navigation }) => {
  return (
    <PageContainer>
      <BackButton navigation={navigation} title='Nova meta' />
      <RegisterGoalForm navigation={navigation} />
    </PageContainer>
  )
}

export default GoalsScreen