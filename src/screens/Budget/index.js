import * as React from 'react';
import {Animated, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {CustomTabBar, FloatOptionsButton, HistoryBudget, PageContainer} from '../../components';
import {Box, Pressable, Text, useColorModeValue} from 'native-base';
import {DAYS_OF_WEEK} from '../../constants/date.constants';
import {StackedBarChart} from 'react-native-chart-kit';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../contexts/UserContext';

const GanhosRoute = () => (
  <View>
    <HistoryBudget
      budgetItems={[
        {
          date: '2021-09-01',
          value: 1000,
          title: 'Salário',
        },
        {
          date: '2021-09-02',
          value: 1000,
          title: 'Salário',
        },
        {
          date: '2021-09-03',
          value: 1000,
          title: 'Salário',
        },
        {
          date: '2021-09-01',
          value: 1000,
          title: 'Salário',
        },
      ]}
    />
  </View>
);

const DespesasRoute = () => (
  <Box>
    <HistoryBudget
      budgetItems={[
        {
          date: '2021-09-01',
          value: 100,
          title: 'Gasolina',
        },
        {
          date: '2021-09-02',
          value: 50,
          title: 'Gasolina',
        },
        {
          date: '2021-09-03',
          value: 120,
          title: 'Gasolina',
        },
        {
          date: '2021-09-01',
          value: 200,
          title: 'Gasolina',
        },
      ]}
    />
  </Box>
);

// eslint-disable-next-line
const renderScene = SceneMap({
  first: GanhosRoute,
  second: DespesasRoute,
});


const Budget = ({navigation}) => {
  const layout = useWindowDimensions();
  const { user } = React.useContext(UserContext);
  const [graphData, setGraphData] = React.useState([]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'Ganhos',
    },
    {
      key: 'second',
      title: 'Despesas',
    },
  ]);

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


  const data = {
    labels: graphData.map((item) => DAYS_OF_WEEK[new Date(item[0]).getDay()]),
    lengend: ['Ganhos', 'Despesas'],
    data: graphData.map((item) => [(item[1].totalEarnings > 0) && item[1].totalEarnings, (item[1].totalExpenses > 0) && item[1].totalExpenses]),
    barColors: ['#00ff0030', '#ff000030'],
  };


  React.useEffect(() => {
    getLastWeekGraphData().then((data) => {
      setGraphData(Object.entries(data));
    });
  }, []);


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
      pageTitle="Orçamento"
    >
      {/* Grafico */}
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
            <Text>Ganhos</Text>
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
            <Text>Despesas</Text>
          </Box>
        </Box>
      </View>

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

      {/* Botao fixo */}
      <FloatOptionsButton
        navigation={navigation}
        subButtons={subButtons}
      />
    </PageContainer>
  );
};

export default Budget;
