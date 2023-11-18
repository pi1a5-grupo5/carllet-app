import React from 'react';
import {
  PageContainer, MenuGroup, ProfileCard,
} from '../../components';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Box,
  Modal,
  ScrollView, useToast,
} from 'native-base';
import { useTranslation } from 'react-i18next';

import { useUserContext } from '../../hooks/useUserContext';
import ToastAlert from '../../components/atoms/Alert';
import LanguageSelector from '../../components/atoms/LanguageSelector';

const Profile = ({ navigation }) => {
  const toast = useToast();
  const [showModal, setShowModal] = React.useState(false);
  const { user, handleLogout } = useUserContext();
  const { t } = useTranslation();

  const { email, name } = user;

  const handleMVPInformation = () => {
    return toast.show(
      {
        placement: 'top-left',
        render: ({ id }) => {
          return (
            <ToastAlert
              id={id}
              {
              ...{
                title: 'MVP',
                variant: 'left-accent',
                description: t("alerts.errors.mvp"),
                isClosable: false,
                placement: 'top',
              }
              } />
          );
        },
      });
  };

  const MENU_ITEMS = [
    {
      title: t('pages.home.profile.account.myAccount'),
      description: t('pages.home.profile.account.myAccountText'),
      onPress: () => navigation.navigate('Account'),
      iconAs: MaterialIcons,
      iconName: 'person',
    },
    {
      title: t('pages.home.profile.settings'),
      description: t('pages.home.profile.settingsText'),
      onPress: () => setShowModal(true),
      iconAs: MaterialIcons,
      iconName: 'settings',
    },
    {
      title: t('pages.home.profile.logout'),
      description: t('pages.home.profile.logoutText'),
      onPress: () => onSignOut(),
      iconAs: MaterialIcons,
      iconName: 'logout',
    },
  ];

  const MORE_MENU_ITEMS = [
    {
      title: t('pages.home.profile.about'),
      description: t('pages.home.profile.aboutText'),
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'info',
    },

    {
      title: t('pages.home.profile.help'),
      description: t('pages.home.profile.helpText'),
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'help',
    },

    {
      title: t('pages.home.profile.termsOfUse'),
      description: t('pages.home.profile.termsOfUseText'),
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'description',
    },

    {
      title: t('pages.home.profile.privacyPolicy'),
      description: t('pages.home.profile.privacyPolicyText'),
      onPress: handleMVPInformation,
      iconAs: MaterialIcons,
      iconName: 'privacy-tip',
    },

  ];

  const onSignOut = () => {
    handleLogout();
  };


  return (
    <PageContainer
      pageTitle={t('menuItems.profile')}
    >
      <ProfileCard
        name={name}
        email={email}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <MenuGroup
          items={MENU_ITEMS}
        />
        <MenuGroup
          title={t('pages.home.profile.more')}
          items={MORE_MENU_ITEMS}
        />
      </ScrollView>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        position={"center"}
      >
        <LanguageSelector />
      </Modal>
    </PageContainer>
  );
};

export default Profile;
