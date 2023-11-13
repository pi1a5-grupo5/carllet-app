import React from 'react';
import {BackButton, PageContainer} from '../../components';
import RegisterEarningForm from '../../components/orgs/RegisterEarningForm';
import {SafeAreaView} from 'react-native-safe-area-context';

const EarningPage = ({navigation}) => {
  return (
    <PageContainer>
      <BackButton navigation={navigation} title='Novo ganho' />
      <RegisterEarningForm navigation={navigation} />
    </PageContainer>
  );
};

export default EarningPage;
