import React from 'react';
import {BackButton, PageContainer, FuelExpenseForm} from '../../components';
import {useTranslation} from 'react-i18next';

const FuelPage = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <PageContainer>
      <BackButton navigation={navigation} title={t("pages.home.controlTab.newEarnings")} />
      <FuelExpenseForm navigation={navigation} />
    </PageContainer>
  );
};

export default FuelPage;
