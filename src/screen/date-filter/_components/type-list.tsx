import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {DateFilterSelector, FilterType, useRootStore} from '../../../store';

const List = [
  {
    type: FilterType.WEEKLY,
  },
  {
    type: FilterType.MONTHLY,
  },
  {
    type: FilterType.YEARLY,
  },
  {
    type: FilterType.CUSTOM,
  },
];

const TypeList = () => {
  const selectedType = useRootStore(DateFilterSelector.selectSelectedType);
  const {changeFilterType} = useRootStore();

  const onChange = useCallback(
    (type: FilterType) => () => {
      changeFilterType(type);
    },
    [changeFilterType],
  );

  return (
    <View style={styles.container}>
      {List?.map(item => {
        const selected = item?.type === selectedType;
        return (
          <TouchableOpacity
            key={item?.type}
            activeOpacity={0.8}
            onPress={onChange(item?.type)}>
            <Text style={styles.typeText}>{item?.type}</Text>
            {selected && <View style={styles.selected} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(TypeList);

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 0.75,
    borderBottomColor: 'silver',
  },
  typeText: {
    textTransform: 'capitalize',
    fontSize: 16,
  },
  selected: {
    height: 2,
    width: 10,
    borderRadius: 3,
    backgroundColor: 'darkslateblue',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -2,
  },
});
