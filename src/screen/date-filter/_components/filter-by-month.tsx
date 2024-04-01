import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {range} from 'ramda';
import {Metrics} from '../../../theme/metric';
import Icon from 'react-native-vector-icons/AntDesign';
import {DateFilterSelector, useRootStore} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';

const FilterByMonth = () => {
  const selectMonthlyFilter = useRootStore(
    DateFilterSelector.selectMonthlyFilter,
  );
  const {changeMonthlyFilterMonth, changeMonthlyFilterYear} = useRootStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onIncreaseYear = () => {
    changeMonthlyFilterYear(Number(selectMonthlyFilter?.year + 1));
  };

  const onDecreaseYear = () => {
    changeMonthlyFilterYear(Number(selectMonthlyFilter?.year - 1));
  };

  const onSelectMonth = (month: number) => () => {
    changeMonthlyFilterMonth(month);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowYear}>
        <TouchableOpacity activeOpacity={0.8} onPress={onDecreaseYear}>
          <Icon name="leftcircle" size={16} color={'slateblue'} />
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectMonthlyFilter?.year}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onIncreaseYear}>
          <Icon name="rightcircle" size={16} color={'slateblue'} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperList}>
        {range(1, 13)?.map(month => {
          const selected = month === selectMonthlyFilter?.month;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.monthItem, selected && styles.monthItemSelected]}
              key={month}
              onPress={onSelectMonth(month)}>
              <Text
                style={[
                  styles.monthText,
                  selected && styles.monthTextSelected,
                ]}>
                {month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(FilterByMonth);

const styles = StyleSheet.create({
  container: {},
  wrapperList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    padding: 20,
  },
  monthItem: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 5,
    borderRadius: 30,
    width: (Metrics.screenWidth - 120) / 4,
    alignItems: 'center',
  },
  monthItemSelected: {
    backgroundColor: 'gold',
  },
  monthText: {
    color: 'gray',
  },
  monthTextSelected: {
    color: 'black',
  },
  rowYear: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  yearText: {
    fontSize: 18,
    fontWeight: '600',
    width: 55,
    textAlign: 'center',
  },
});
