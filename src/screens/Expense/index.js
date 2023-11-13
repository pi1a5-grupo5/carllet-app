import React from 'react';
import {BackButton, CustomTabBar, PageContainer, RegisterExpenseForm, RegisterOthersExpensesForm} from '../../components';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, useWindowDimensions} from 'react-native';

const MaintenanceRoute = () => (
  <View>
    <RegisterExpenseForm
      title='Manutenção'
    />
  </View>
);

const OthersExpenseRoute = () => (
  <View>
    <RegisterOthersExpensesForm
      title='Outras despesas'
    />
  </View>
);

const ExpensePage = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'maintenance',
      title: 'Manutenção',
    },
    {
      key: 'othersExpense',
      title: 'Outras despesas',
    },
  ]);

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
        initialLayout={{width: layout.width}}
      />
    </PageContainer>
  );
};

export default ExpensePage;
