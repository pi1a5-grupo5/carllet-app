import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Icon} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

const TabBarCustomButton = (props) => {
  const {item, onPress, accessibilityState} = props;
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <View
        style={item.isCenter && styles.centerButton}
      >
        <Icon
          as={<MaterialIcons name={item.icon} />}
          size={6}
          color={item.isCenter && '#fff' || !item.isCenter && accessibilityState.selected && '#6AA68B' || '#808080'}
        />
      </View>
      {!item.isCenter &&
        <Text style={{
          fontSize: 10,
          color: !item.isCenter && accessibilityState.selected ? '#6AA68B' : '#808080',
          fontWeight: 'bold',
        }}>{`${t(item.name)}`}</Text>}
    </TouchableOpacity>
  );
};

export default TabBarCustomButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 70,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#6AA68B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#f2f2f2',
  },
});
