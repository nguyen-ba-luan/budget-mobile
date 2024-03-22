import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

interface IProps {
  onAddNote(): void;
  time: string;
  onChangeTime(time: string): void;
}

const MoreAction = (props: IProps) => {
  const {onAddNote, onChangeTime, time} = props;
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const hideDatePicker = useCallback(() => {
    setIsDatePickerVisible(false);
  }, []);

  const openDatePicker = useCallback(() => {
    setIsDatePickerVisible(true);
  }, []);

  const handleConfirm = useCallback(
    (date: Date) => {
      onChangeTime(date.toISOString());
      hideDatePicker();
    },
    [onChangeTime],
  );

  const isSameToday = useMemo(() => dayjs(time).isSame(dayjs(), 'day'), [time]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subItem}
        activeOpacity={0.8}
        onPress={onAddNote}>
        <Icon name="filetext1" color={'slateblue'} size={18} />
        <Text style={styles.subText}>{'Note'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.subItem}
        activeOpacity={0.8}
        onPress={openDatePicker}>
        <Icon name="calendar" color={'slateblue'} size={18} />
        <Text style={styles.subText}>
          {isSameToday ? 'Today' : dayjs(time).format('DD MMM')}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="inline"
      />
    </View>
  );
};

export default memo(MoreAction);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 8,
    marginBottom: 10,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'khaki',
    alignSelf: 'baseline',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 2,
    gap: 8,
  },
  subText: {
    color: 'slateblue',
    fontSize: 18,
  },
});
