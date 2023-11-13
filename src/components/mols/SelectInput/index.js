import {View, Text} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Box} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';

const SelectComponent = ({
  placeholder,
  items,
  onValueChange,
  value,
  style,
  disabled,
  placeholderTextColor,
  useNativeAndroidPickerStyle,
  textInputProps,
  doneText,
  onDonePress,
  onUpArrow,
  onDownArrow,
  onOpen,
  onClose,
  modalProps,
  hideIcon,
  children,
  Icon,
  InputAccessoryView,
  ...rest
}) => {
  return (
    <Box
      borderWidth={1}
      borderColor={'gray.300'}
      borderRadius={5}
      flex={1}
      flexDirection={'row'}
      alignItems={'center'}
      p={0}
    >
      {Icon && <Icon />}
      <Box
        flex={1}
      >
        <RNPickerSelect
          placeholder={placeholder}
          items={items}
          onValueChange={onValueChange}
          value={value}
          style={style}
          disabled={disabled}
          placeholderTextColor={placeholderTextColor}
          useNativeAndroidPickerStyle={useNativeAndroidPickerStyle}
          textInputProps={textInputProps}
          doneText={doneText}
          onDonePress={onDonePress}
          onUpArrow={onUpArrow}
          onDownArrow={onDownArrow}
          onOpen={onOpen}
          onClose={onClose}
          modalProps={modalProps}
          hideIcon={hideIcon}
          children={children}
          InputAccessoryView={InputAccessoryView}
          {...rest}
        />
      </Box>
    </Box>
  );
};

export default SelectComponent;
