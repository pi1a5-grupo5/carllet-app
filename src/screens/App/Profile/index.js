import React from 'react'
import { PageContainer } from '../../../components'
import { ProfileCard } from '../../../components/mols'
import { Text } from 'native-base'

const Profile = () => {
  return (
    <PageContainer
      pageTitle={'Perfil'}
    >
      <ProfileCard />
    </PageContainer>
  )
}

export default Profile