import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { PageContainer } from '../../components';
import { Box, Text } from 'native-base';
import { DAYS_OF_WEEK } from '../../constants/date.constants';
import { BarChart, StackedBarChart } from 'react-native-chart-kit';

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

const renderScene = SceneMap({
	first: GanhosRoute,
	second: DespesasRoute,
});


const Budget = () => {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Ganhos' },
		{ key: 'second', title: 'Despesas' },
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
			[2000, 700]
		],
		barColors: ['#00ff0030', '#ff000030'],
	}

	return (
		<PageContainer
			pageTitle="Orçamento"
		>
			{/* Grafico */}
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 20,
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
						backgroundGradientFrom: '#fff',
						backgroundGradientTo: '#fff',
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


			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>

			{/* Botao fixo */}
		</PageContainer>
	);
}

export default Budget;