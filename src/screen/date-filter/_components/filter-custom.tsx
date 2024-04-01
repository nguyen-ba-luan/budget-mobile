import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {DateFilterSelector, useRootStore} from '../../../store';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const FilterCustom = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const hideDatePicker = useCallback(() => {
    setIsDatePickerVisible(false);
  }, []);

  const openDatePicker = useCallback(() => {
    setIsDatePickerVisible(true);
  }, []);

  const handleConfirm = useCallback((date: Date) => {
    console.log(date.toISOString());
    hideDatePicker();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowDate}>
        <TouchableOpacity
          style={styles.wrapperDateText}
          activeOpacity={0.8}
          onPress={openDatePicker}>
          <Text style={styles.dateText}>{'2023-12-31'}</Text>
        </TouchableOpacity>
        <Text>{'-'}</Text>
        <TouchableOpacity
          style={styles.wrapperDateText}
          activeOpacity={0.8}
          onPress={openDatePicker}>
          <Text style={styles.dateText}>{'2023-12-31'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
        <Text style={styles.btnText}>{'Confirm'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="inline"
      />
    </View>
  );
};

export default memo(FilterCustom);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  rowDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapperDateText: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'gold',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'slateblue',
  },
});
