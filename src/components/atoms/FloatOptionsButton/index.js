import {Box, IconButton, VStack} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {Animated} from 'react-native';
import React from 'react';

const FlotOptionsButton = ({
  navigation,
  icon = 'insights',
  options,
  subButtons = [
    {
      icon: 'add',
      onPress: () => console.log('plus'),
    },
    {
      icon: 'remove',
      onPress: () => console.log('minus'),
    },
    {
      icon: 'edit',
      onPress: () => console.log('edit'),
    },
  ],
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [animation] = React.useState(new Animated.Value(0));

  const handlePress = () => {
    Animated.timing(animation, {
      toValue: !isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const handleSubButtonPress = (onPress) => {
    setIsOpen(false);
    onPress();
  };

  return (
    <Box
      position="absolute"
      bottom={24}
      right={10}
      mb={2}
      {...rest}
    >
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          zIndex: isOpen ? 1 : -1,
          opacity: animation.interpolate({
            inputRange: [0.01, 0.5],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0.01, 1],
                outputRange: [0, -1 * 50],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <VStack space={4} alignItems={'center'}>
          {subButtons.map((subButton, index) => (
            <IconButton
              key={index}
              onPress={() => handleSubButtonPress(subButton.onPress)}
              variant="solid"
              shadow={2}
              rounded="full"
              width={35}
              height={35}
              alignItems={'center'}
              justifyContent={'center'}
              p={0}
              mb={2}
              _icon={{
                as: MaterialIcons,
                name: subButton.icon,
              }}
            />
          ))}
        </VStack>
      </Animated.View>
      <IconButton
        onPress={handlePress}
        bg="white"
        shadow={2}
        rounded="full"
        width={35}
        height={35}
        alignItems={'center'}
        justifyContent={'center'}
        p={0}
        _icon={{
          as: MaterialIcons,
          name: isOpen ? 'close' : icon,
        }}
      />
    </Box>
  );
};

export default FlotOptionsButton;
