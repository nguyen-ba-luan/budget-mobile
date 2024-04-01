import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useMergingState from '../../../hook/useMergingState';
import dayjs from 'dayjs';
import {formatDate, insertObjectIf} from '../../../util';
import {DateFilterSelector, useRootStore} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';

enum PickerFor {
  FROM = 'FROM',
  TO = 'TO',
}

const FilterCustom = () => {
  const customFilter = useRootStore(DateFilterSelector.selectCustomFilter);
  const {changeCustomFilter} = useRootStore();

  const [state, setState] = useMergingState({
    isDatePickerVisible: false,
    pickerFor: PickerFor.FROM,
    date: undefined as Date | undefined,
    minimumDate: undefined as Date | undefined,
    maximumDate: undefined as Date | undefined,
    fromValue: customFilter.from,
    toValue: customFilter.to,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const hideDatePicker = useCallback(() => {
    setState({isDatePickerVisible: false});
  }, [setState]);

  const openDatePicker = useCallback(
    (pickerFor: PickerFor) => () => {
      setState(prevState => ({
        pickerFor,
        isDatePickerVisible: true,
        ...insertObjectIf(pickerFor === PickerFor.FROM, {
          maximumDate: dayjs(prevState.toValue).toDate(),
          minimumDate: undefined,
          date: dayjs(prevState.fromValue).toDate(),
        }),
        ...insertObjectIf(pickerFor === PickerFor.TO, {
          minimumDate: dayjs(prevState.fromValue).toDate(),
          maximumDate: undefined,
          date: dayjs(prevState.toValue).toDate(),
        }),
      }));
    },
    [setState],
  );

  const handleConfirm = useCallback(
    (date: Date) => {
      setState(prevState => ({
        isDatePickerVisible: false,
        date: undefined,
        maximumDate: undefined,
        minimumDate: undefined,
        ...insertObjectIf(prevState.pickerFor === PickerFor.FROM, {
          fromValue: date.toISOString(),
        }),
        ...insertObjectIf(prevState.pickerFor === PickerFor.TO, {
          toValue: date.toISOString(),
        }),
      }));
    },
    [setState],
  );

  const onSubmit = useCallback(() => {
    changeCustomFilter({
      from: state.fromValue,
      to: state.toValue,
    });
    navigation.goBack();
  }, [changeCustomFilter, navigation, state.fromValue, state.toValue]);

  return (
    <View style={styles.container}>
      <View style={styles.rowDate}>
        <TouchableOpacity
          style={styles.wrapperDateText}
          activeOpacity={0.8}
          onPress={openDatePicker(PickerFor.FROM)}>
          <Text style={styles.dateText}>{formatDate(state.fromValue)}</Text>
        </TouchableOpacity>
        <Text>{'-'}</Text>
        <TouchableOpacity
          style={styles.wrapperDateText}
          activeOpacity={0.8}
          onPress={openDatePicker(PickerFor.TO)}>
          <Text style={styles.dateText}>{formatDate(state.toValue)}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={onSubmit}>
        <Text style={styles.btnText}>{'Confirm'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={state.isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="inline"
        minimumDate={state.minimumDate}
        maximumDate={state.maximumDate}
        date={state.date}
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
