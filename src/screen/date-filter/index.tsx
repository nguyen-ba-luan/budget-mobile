import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FilterByMonth, TypeList, FilterCustom} from './_components';
import {DateFilterSelector, FilterType, useRootStore} from '../../store';

const DateFilter = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'DateFilter'>) => {
  const selectedType = useRootStore(DateFilterSelector.selectSelectedType);

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapper} activeOpacity={1}>
          <TypeList />
          {selectedType === FilterType.MONTHLY && <FilterByMonth />}
          {selectedType === FilterType.CUSTOM && <FilterCustom />}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DateFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#0003',
  },
  wrapper: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
