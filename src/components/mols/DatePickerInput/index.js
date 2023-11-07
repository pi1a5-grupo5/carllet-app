import { View, TextInput, Platform, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Input, Pressable, Box, Button } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerInput = ({
  value,
  onChange,
  placeholder,
  label,
  name,
  error,
  touched,
  ...rest
}) => {

  const [show, setShow] = React.useState(false);

  const toggleDatePicker = () => {
    setShow(!show);
  }

  const handleDateChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate;

      if(Platform.OS === 'ios') {
        onChange(name, currentDate);
      }
      if (Platform.OS === 'android') {
        toggleDatePicker();
        onChange(name, currentDate.toDateString());
      }

    } else {
      toggleDatePicker();
    }
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Box
          borderWidth={1}
          borderColor={'gray.300'}
          borderRadius={5}
          p={2}
        >
          <TextInput
            placeholder={placeholder}
            value={value ? value.toLocaleDateString() : ''}
            onPressIn={toggleDatePicker}
            isDisabled={true}
            {...rest}
          />
        </Box>
      )}

      {(Platform.OS === 'android') && (
        <Pressable
          onPress={toggleDatePicker}
        >
          <TextInput
            placeholder={placeholder}
            value={value}
            editable={false}
            onChangeText={onChange}
            {...rest}
          />
        </Pressable>
      )}
    
      {show && Platform.OS == "android" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value ? new Date(value) : new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date('2022-01-01')}
          maximumDate={new Date()}
        />
      )}

      {show && Platform.OS == "ios" && (
        <Box
          style={styles.datePickerIOS}
        >
          <Box
            flex={1}
            flexDirection={'row'}
            justifyContent={'flex-end'}
            width={'100%'}
          >
            <Button
              onPress={toggleDatePicker}
              variant={'ghost'}
              colorScheme={'primary'}
            >
              Concluído
            </Button>
          </Box>
          <DateTimePicker
            testID="dateTimePicker"
            value={value || new Date()}
            mode={'date'}
            is24Hour={true}
            display="spinner"
            onChange={handleDateChange}
            minimumDate={new Date('2022-01-01')}
            maximumDate={new Date()}
          />
        </Box>
      )}
    </>
  )
}

export default DatePickerInput

const styles = StyleSheet.create({
  datePickerIOS: {
    position: 'absolute',
    top: Dimensions.get('window').height - 400,
    padding: 10,
    left: -20,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})