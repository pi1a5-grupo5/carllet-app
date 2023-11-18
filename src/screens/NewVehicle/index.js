import {View, Text} from 'react-native';
import React from 'react';
import {BackButton, PageContainer, RegisterVehicleForm} from '../../components';
import {useTranslation} from 'react-i18next';

const NewVehiclePage = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <PageContainer>
      <BackButton navigation={navigation} title={t("pages.home.vehiclesTab.newVehicle")}/>
      <RegisterVehicleForm navigation={navigation} />
    </PageContainer>
  );
};

export default NewVehiclePage;
