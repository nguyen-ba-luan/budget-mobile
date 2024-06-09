import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import {
  DateFilterSelector,
  DateFilterState,
  FilterType,
  useRootStore,
} from '../../../store';
import {formatDate} from '../../../util';
import dayjs from 'dayjs';

const Filter = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

  const selectedType = useRootStore(DateFilterSelector.selectSelectedType);
  const monthlyFilter = useRootStore(DateFilterSelector.selectMonthlyFilter);
  const yearlyFilter = useRootStore(DateFilterSelector.selectYearlyFilter);
  const customFilter = useRootStore(DateFilterSelector.selectCustomFilter);
  const {
    changeYearlyFilter,
    changeMonthlyFilterMonth,
    changeMonthlyFilterYear,
  } = useRootStore();

  const onOpenDateFilter = useCallback(() => {
    navigation.navigate('DateFilter', {
      previousScreen: route?.name,
    });
  }, [navigation, route?.name]);

  const title = useMemo(
    () => getTitle({selectedType, customFilter, monthlyFilter, yearlyFilter}),
    [customFilter, monthlyFilter, selectedType, yearlyFilter],
  );

  const disableChange = selectedType === FilterType.CUSTOM;

  const onIncreaseYear = () => {
    if (selectedType === FilterType.YEARLY) {
      changeYearlyFilter(Number(yearlyFilter?.year + 1));
      return;
    }

    if (selectedType === FilterType.MONTHLY) {
      const nextMonth = dayjs()
        .year(monthlyFilter.year)
        .month(monthlyFilter.month - 1)
        .add(1, 'month');

      changeMonthlyFilterMonth(nextMonth.get('month') + 1);
      changeMonthlyFilterYear(nextMonth.get('year'));
      return;
    }
  };

  const onDecreaseYear = () => {
    if (selectedType === FilterType.YEARLY) {
      changeYearlyFilter(Number(yearlyFilter?.year - 1));
      return;
    }

    if (selectedType === FilterType.MONTHLY) {
      const prevMonth = dayjs()
        .year(monthlyFilter.year)
        .month(monthlyFilter.month - 1)
        .subtract(1, 'month');

      changeMonthlyFilterMonth(prevMonth.get('month') + 1);
      changeMonthlyFilterYear(prevMonth.get('year'));
      return;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        hitSlop={15}
        activeOpacity={0.8}
        onPress={onDecreaseYear}
        disabled={disableChange}>
        <Icon name="left" size={12} color={'slateblue'} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onOpenDateFilter}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={15}
        activeOpacity={0.8}
        onPress={onIncreaseYear}
        disabled={disableChange}>
        <Icon name="right" size={12} color={'slateblue'} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Filter);

const getTitle = (
  input: Pick<
    DateFilterState,
    'selectedType' | 'monthlyFilter' | 'yearlyFilter' | 'customFilter'
  >,
) => {
  const {customFilter, monthlyFilter, selectedType, yearlyFilter} = input;

  if (selectedType === FilterType.CUSTOM) {
    return `${formatDate(customFilter?.from, 'DD-MM')} - ${formatDate(
      customFilter.to,
      'DD-MM',
    )}`;
  }

  if (selectedType === FilterType.MONTHLY) {
    const currentYear = dayjs().get('year');
    const currentMonth = dayjs().get('month') + 1;

    if (
      currentYear === monthlyFilter.year &&
      currentMonth === monthlyFilter.month
    ) {
      return 'This Month';
    }
    const from = dayjs()
      .year(monthlyFilter.year)
      .month(monthlyFilter.month - 1)
      .startOf('month')
      .format('DD-MM');

    const to = dayjs()
      .year(monthlyFilter.year)
      .month(monthlyFilter.month - 1)
      .endOf('month')
      .format('DD-MM');

    return `${from} - ${to}`;
  }

  if (selectedType === FilterType.YEARLY) {
    const currentYear = dayjs().get('year');

    return currentYear === yearlyFilter?.year
      ? 'This Year'
      : yearlyFilter?.year;
  }

  return selectedType;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
