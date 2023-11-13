import * as React from 'react';
import {Animated} from 'react-native';
import {Box, Pressable, useColorModeValue} from 'native-base';

const CustomTabBar = ({_renderTabBarProps: props, tabView, setTabView}) => {
  const inputRange = props.navigationState.routes.map((x, i) => i);

  return (
    <Box flexDirection="row">
      {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex) => inputIndex === i ? 1 : 0.5),
        });
        const color = tabView === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor = tabView === i ? 'primary.500' : useColorModeValue('coolGray.200', 'gray.400');
        return <Pressable
          onPress={() => {
            setTabView(i);
          }}
          key={i}
          borderBottomWidth="3"
          borderColor={borderColor}
          flex={1}
          alignItems="center"
          p="3"
          cursor="pointer"
          marginBottom={5}
        >
          <Box>
            <Animated.Text style={{
              color,
            }}>{route.title}</Animated.Text>
          </Box>
        </Pressable>;
      })}
    </Box>
  );
};

export default CustomTabBar;
