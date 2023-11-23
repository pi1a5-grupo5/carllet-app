import * as React from 'react';
import { Animated, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CustomTabBar, FloatOptionsButton, HistoryBudget, PageContainer } from '../../components';
import { Box, Pressable, Spinner, Text, useColorModeValue } from 'native-base';
import { DAYS_OF_WEEK } from '../../constants/date.constants';
import { StackedBarChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { EarningService } from '../../services/earning.service';
import { ExpenseService } from '../../services/expense.service';
import { set } from 'react-native-reanimated';



const Budget = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [loading, setLoading] = React.useState(true);
  const { user } = React.useContext(UserContext);
  const [graphData, setGraphData] = React.useState([]);
  const [earningHistory, setEarningHistory] = React.useState([]);
  const [expenseHistory, setExpenseHistory] = React.useState([]);
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: 'first',
      title: t('pages.home.controlTab.earnings'),
    },
    {
      key: 'second',
      title: t('pages.home.controlTab.expense.expenses'),
    },
  ]);


  const GanhosRoute = () => (
    <View>
      <HistoryBudget
        budgetItems={earningHistory}
      />
    </View>
  );

  const DespesasRoute = () => (
    <Box>
      <HistoryBudget
        budgetItems={expenseHistory}
      />
    </Box>
  );


  // eslint-disable-next-line
  const renderScene = SceneMap({
    first: GanhosRoute,
    second: DespesasRoute,
  });

  const getLastWeekGraphData = async () => {
    try {
      const lastWeekValues = await UserService.getLastDaysUserExpensesAndEarns(user?.id);
      if (!lastWeekValues) {
        return [];
      }

      return lastWeekValues;
    }
    catch (error) {
      console.error(error);
    }
  };

  const getUserEarningHistory = async () => {
    try {
      const response = await EarningService.getUserEarningHistory(user?.id);
      if (!response) {
        return [];
      }

      return response;
    }
    catch (error) {
      console.error(error);
    }
  }

  const getUserExpenseHistory = async () => {
    try {
      const response = await ExpenseService.getUserExpenseHistory(user?.id);
      if (!response) {
        return [];
      }

      return response;
    }
    catch (error) {
      console.error(error);
    }
  }


  const data = {
    labels: graphData.map((item) => DAYS_OF_WEEK[dayjs(item[0]).get('day')]),
    lengend: [t('pages.controlTab.earnings'), t('')],
    data: graphData.map((item) => [(item[1].totalEarnings > 0) && item[1].totalEarnings, (item[1].totalExpenses > 0) && item[1].totalExpenses]),
    barColors: ['#00ff0030', '#ff000030'],
  };


  React.useEffect(() => {
    setLoading(true);
    getLastWeekGraphData().then((data) => {
      setGraphData(Object.entries(data));
    });

    getUserEarningHistory().then((data) => {
      setEarningHistory(data);
    });

    getUserExpenseHistory().then((data) => {
      setExpenseHistory(data);
    }).finally(() => {
      setLoading(false);
    });

  }, [user]);


  const _renderTabBar = (props) => {
    return <CustomTabBar _renderTabBarProps={props} tabView={index} setTabView={setIndex} />;
  };

  const subButtons = [
    {
      icon: 'add',
      onPress: () => navigation.navigate('RegisterEarning'),
    },
    {
      icon: 'remove',
      onPress: () => navigation.navigate('RegisterExpense'),
    },
    {
      icon: 'local-gas-station',
      onPress: () => navigation.navigate('RegisterFuel'),
    },
  ];

  return (
    <PageContainer
      pageTitle={t('pages.home.controlTab.budget')}
    >
      {/* Grafico */}


      <>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 3,
          }}
        >
          <StackedBarChart
            data={data}
            decimalPlaces={0}
            width={layout.width - 40}
            height={220}
            chartConfig={{
              barPercentage: 0.5,
              backgroundColor: '#f2f2f2',
              backgroundGradientFrom: '#f2f2f2',
              backgroundGradientTo: '#f2f2f2',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              borderRadius: 16,
            }}
          />
        </View>

        <View paddingTop={5} marginBottom={20}>
          {/* Legenda */}
          <Box
            display="flex"
            flexDirection="row"
            gap={5}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              {/* Color */}
              <Box
                width={5}
                height={5}
                backgroundColor="#00ff0030"
              />
              {/* Description */}
              <Text>{t('pages.home.controlTab.earnings')}</Text>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              {/* Color */}
              <Box
                width={5}
                height={5}
                backgroundColor="#ff000030"
              />
              {/* Description */}
              <Text>{t('pages.home.controlTab.expense.expenses')}</Text>
            </Box>
          </Box>
        </View>
        {!loading && (
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
        )}

        {loading && (
          <>
            {/* Loading for TabView */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner
                accessibilityLabel="Loading history"
                color="primary.500"
              />
            </View>

          </>
        )}

        {/* Botao fixo */}
        <FloatOptionsButton
          navigation={navigation}
          subButtons={subButtons}
        />
      </>
    </PageContainer>
  );
};

export default Budget;
