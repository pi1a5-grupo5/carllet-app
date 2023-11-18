import { View, Text } from 'react-native'
import React from 'react'
import { PageContainer, RegisterGoalForm, BackButton } from '../../components'
import { useTranslation } from 'react-i18next'

const GoalsScreen = ({ navigation }) => {
  const { t } = useTranslation()
  
  return (
    <PageContainer>
      <BackButton navigation={navigation} title={t('pages.home.screenItems.newGoal')} />
      <RegisterGoalForm navigation={navigation} />
    </PageContainer>
  )
}

export default GoalsScreen