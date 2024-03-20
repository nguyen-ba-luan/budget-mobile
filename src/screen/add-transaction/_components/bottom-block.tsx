import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {RootStoreSelector, useRootStore} from '../../../store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';

const BottomBlock = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AddTransaction'>>();

  const {categoryId, ledgerId} = route.params;

  const selectedCategory = useRootStore(
    RootStoreSelector.selectLedgerCategory(ledgerId, categoryId),
  );

  return (
    <View style={styles.container}>
      <View style={styles.subCategoryWrapper}>
        {selectedCategory?.subCategories?.map(item => {
          return (
            <TouchableOpacity
              key={item?.id}
              style={styles.subItem}
              activeOpacity={0.8}>
              <Text style={styles.subText}>{item?.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(BottomBlock);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rosybrown',
  },
  subCategoryWrapper: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  subItem: {
    backgroundColor: 'snow',
    alignSelf: 'baseline',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  subText: {
    color: 'dimgray',
  },
});
