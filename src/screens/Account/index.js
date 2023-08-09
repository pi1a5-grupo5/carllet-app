import React from 'react';
import {
  BackButton, PageContainer, ProfileCard, UpdateProfileForm,
} from '../../components';
import {useUserContext} from '../../hooks/useUserContext';

const Account = ({navigation}) => {
  const {user} = useUserContext();


  return (
    <PageContainer>
      <BackButton navigation={navigation} title='Minha conta' />
      <ProfileCard
        name={user.name}
        email={user.email}
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
  );
};

export default Account;
