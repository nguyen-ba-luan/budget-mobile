import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {DateFilterSelector, useRootStore} from '../../../store';

const FilterByYear = () => {
  const selectYearlyFilter = useRootStore(
    DateFilterSelector.selectYearlyFilter,
  );
  const {changeYearlyFilter} = useRootStore();

  const onIncreaseYear = () => {
    changeYearlyFilter(Number(selectYearlyFilter?.year + 1));
  };

  const onDecreaseYear = () => {
    changeYearlyFilter(Number(selectYearlyFilter?.year - 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowYear}>
        <TouchableOpacity activeOpacity={0.8} onPress={onDecreaseYear}>
          <Icon name="leftcircle" size={16} color={'slateblue'} />
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectYearlyFilter?.year}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onIncreaseYear}>
          <Icon name="rightcircle" size={16} color={'slateblue'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(FilterByYear);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  rowYear: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 10,
  },
  yearText: {
    fontSize: 18,
    fontWeight: '600',
    width: 55,
    textAlign: 'center',
  },
});
