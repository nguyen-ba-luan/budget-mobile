import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import {CategorySelector, useRootStore} from '../../../store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';
import Icon from 'react-native-vector-icons/AntDesign';

interface IProps {
  selectedSubCategoryId: null | number;
  onSelect(subCategoryId: number): void;
  onAddMore(): void;
}

const SubCategory = (props: IProps) => {
  const {onSelect, selectedSubCategoryId, onAddMore} = props;
  const route = useRoute<RouteProp<RootStackParamList, 'AddTransaction'>>();

  const {categoryId} = route.params;

  const selectedCategory = useRootStore(
    CategorySelector.selectLedgerCategory(categoryId),
  );

  const onPress = useCallback(
    (subCategoryId: number) => () => {
      onSelect(subCategoryId);
    },
    [onSelect],
  );

  return (
    <View style={{maxHeight: 94}}>
      <ScrollView contentContainerStyle={styles.container}>
        {selectedCategory?.subCategoryList?.map(item => {
          const selected = selectedSubCategoryId === item?.id;

          return (
            <TouchableOpacity
              key={item?.id}
              style={[styles.subItem, selected && styles.subItemActive]}
              activeOpacity={0.8}
              onPress={onPress(item?.id!)}>
              <Text style={[styles.subText, selected && styles.subTextActive]}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.subItem}
          activeOpacity={0.8}
          onPress={onAddMore}>
          <Icon name="plus" style={styles.subText} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default memo(SubCategory);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 5,
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  subItem: {
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'baseline',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 50,
  },
  subText: {
    color: 'dimgray',
  },
  subItemActive: {
    backgroundColor: 'gold',
  },
  subTextActive: {
    color: 'slateblue',
  },
});
