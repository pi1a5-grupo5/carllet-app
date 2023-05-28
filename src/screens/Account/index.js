import React from 'react'
import { BackButton, PageContainer, ProfileCard, UpdateProfileForm } from '../../components'

const Account = ({ navigation }) => {
  return (
    <PageContainer>
      <BackButton navigation={navigation} title='Minha conta' />
      <ProfileCard
        isVertical
        bgColor='transparent'
        shadow={'none'}
        avatarSize='xl'
        textCenter
        nameColor='black'
        emailColor='#808080'
      />
      <UpdateProfileForm />
    </PageContainer>
  )
}

export default Account