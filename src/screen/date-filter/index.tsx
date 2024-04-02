import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FilterByMonth,
  TypeList,
  FilterCustom,
  FilterByWeek,
  FilterByYear,
} from './_components';
import {DateFilterSelector, FilterType, useRootStore} from '../../store';

const ComponentJson = {
  [FilterType.WEEKLY]: FilterByWeek,
  [FilterType.MONTHLY]: FilterByMonth,
  [FilterType.YEARLY]: FilterByYear,
  [FilterType.CUSTOM]: FilterCustom,
};

const DateFilter = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'DateFilter'>) => {
  const selectedType = useRootStore(DateFilterSelector.selectSelectedType);
  const ChildComponent = ComponentJson[selectedType];

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.wrapper} activeOpacity={1}>
          <TypeList />
          <ChildComponent />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DateFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0003',
  },
  wrapper: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 50,
  },
});
