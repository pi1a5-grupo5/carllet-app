import * as React from 'react';
import { Animated, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CustomTabBar, FloatOptionsButton, HistoryBudget, PageContainer } from '../../components';
import { Box, Pressable, Text, useColorModeValue } from 'native-base';
import { DAYS_OF_WEEK } from '../../constants/date.constants';
import { StackedBarChart } from 'react-native-chart-kit';

const GanhosRoute = () => (
  <View>
    <HistoryBudget
      budgetItems={[
        {
          date: '2021-09-01',
          value: 1000,
          title: 'Salário'
        },
        {
          date: '2021-09-02',
          value: 1000,
          title: 'Salário'
        },
        {
          date: '2021-09-03',
          value: 1000,
          title: 'Salário'
        },
        {
          date: '2021-09-01',
          value: 1000,
          title: 'Salário'
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
          title: 'Gasolina'
        },
        {
          date: '2021-09-02',
          value: 50,
          title: 'Gasolina'
        },
        {
          date: '2021-09-03',
          value: 120,
          title: 'Gasolina'
        },
        {
          date: '2021-09-01',
          value: 200,
          title: 'Gasolina'
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


const Budget = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'Ganhos'
    },
    {
      key: 'second',
      title: 'Despesas'
    },
  ]);

  const data = {
    labels: DAYS_OF_WEEK,
    lengend: ['Ganhos', 'Despesas'],
    data: [
      [700, 100],
      [1000, 200],
      [1200, 300],
      [1400, 400],
      [1600, 500],
      [1800, 600],
      [2000, 700],
    ],
    barColors: ['#00ff0030', '#ff000030'],
  };

  const _renderTabBar = props => {
    return <CustomTabBar _renderTabBarProps={props} tabView={index} setTabView={setIndex} />
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
            backgroundColor: '#fff00',
            backgroundGradientFrom: '#fff00',
            backgroundGradientTo: '#fff00',
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

{/*       <TabView
        navigationState={{
          index,
          routes
        }}
        renderScene={renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      /> */}

      {/* Botao fixo */}
      <FloatOptionsButton 
        navigation={navigation}
        subButtons={subButtons}
      />
    </PageContainer>
  );
};

export default Budget;
