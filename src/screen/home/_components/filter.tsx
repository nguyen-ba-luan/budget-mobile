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

  const onOpenDateFilter = useCallback(() => {
    navigation.navigate('DateFilter', {
      previousScreen: route?.name,
    });
  }, [navigation, route?.name]);

  const title = useMemo(
    () => getTitle({selectedType, customFilter, monthlyFilter, yearlyFilter}),
    [customFilter, monthlyFilter, selectedType, yearlyFilter],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <Icon name="left" size={12} color={'slateblue'} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onOpenDateFilter}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
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
