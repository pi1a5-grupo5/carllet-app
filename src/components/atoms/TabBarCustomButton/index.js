import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';


const TabBarCustomButton = (props) => {

  const { item, onPress, accessibilityState } = props

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
          color={item.isCenter && '#fff' || !item.isCenter && accessibilityState.selected && '#6AA68B'}
        />
      </View>
      {!item.isCenter &&
        <Text style={{
          fontSize: 10,
          color: !item.isCenter && accessibilityState.selected ? '#6AA68B' : '#222',
        }}>{item.name}</Text>}
    </TouchableOpacity>
  )
}

export default TabBarCustomButton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerButton: {
    width: 70,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#6AA68B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#f2f2f2'
  }
})