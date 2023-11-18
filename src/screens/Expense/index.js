import React from 'react';
import { BackButton, CustomTabBar, PageContainer, RegisterExpenseForm, RegisterOthersExpensesForm } from '../../components';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

const ExpensePage = ({ navigation }) => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'maintenance',
      title: t("pages.home.controlTab.expense.maintenance"),
    },
    {
      key: 'othersExpense',
      title: t("pages.home.controlTab.expense.otherExpenses"),
    },
  ]);

  const MaintenanceRoute = () => (
    <RegisterExpenseForm
      title={t("pages.home.controlTab.expense.maintenance")}
      navigation={navigation}
    />
  );
  
  const OthersExpenseRoute = () => (
    <RegisterOthersExpensesForm
      title={t("pages.home.controlTab.expense.otherExpenses")}
      navigation={navigation}
    />
  );

  const renderScene = SceneMap({
    maintenance: MaintenanceRoute,
    othersExpense: OthersExpenseRoute,
  });

  const _renderTabBar = (props) => (
    <CustomTabBar
      _renderTabBarProps={props}
      tabView={index}
      setTabView={setIndex}
    />
  );

  return (
    <PageContainer>
      <BackButton navigation={navigation} title='Nova despesa' />
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </PageContainer>
  );
};

export default ExpensePage;
