import React from 'react';
import {BackButton, PageContainer} from '../../components';
import RegisterEarningForm from '../../components/orgs/RegisterEarningForm';
import {useTranslation} from 'react-i18next';

const EarningPage = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <PageContainer>
      <BackButton navigation={navigation} title={t("pages.home.controlTab.newEarnings")} />
      <RegisterEarningForm navigation={navigation} />
    </PageContainer>
  );
};

export default EarningPage;
