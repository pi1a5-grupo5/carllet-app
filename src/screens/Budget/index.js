import * as React from 'react';
import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { FloatOptionsButton, PageContainer } from '../../components';
import { Box, Text } from 'native-base';
import { DAYS_OF_WEEK } from '../../constants/date.constants';
import { StackedBarChart } from 'react-native-chart-kit';

const GanhosRoute = () => (
  <View>
    <Box>
      <Text>Ganhos</Text>
    </Box>
  </View>
);

const DespesasRoute = () => (
  <View>
    <Box>
      <Text>Despesas</Text>
    </Box>
  </View>
);

const _renderTabBar = props => {
  const inputRange = props.navigationState.routes.map((x, i) => i);

  console.log(props.navigationState.routes);

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        backgroundColor="#ff000000"
        borderRadius={10}
        marginBottom={10}
      >
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(
              inputIndex => (inputIndex === i ? '#000' : '#00000030')
            ),
          });

          return (
            <Box
              key={i}
              borderBottomWidth={3}
              borderBottomColor={color}
              onPress={() => props.jumpTo(route.key)}
            >
              <Text>{route.title}</Text>
            </Box>
          );
        }
        )}
      </Box>
    </Box>
  );
};

// eslint-disable-next-line
const renderScene = SceneMap({
  first: GanhosRoute,
  second: DespesasRoute,
});


const Budget = () => {
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
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff0000',
            backgroundGradientTo: '#fff0000',
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
          routes
        }}
        renderScene={renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      {/* Botao fixo */}
      <FloatOptionsButton />
    </PageContainer>
  );
};

export default Budget;
