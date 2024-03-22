import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {CategorySelector, useRootStore} from '../../../store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {ISubCategory} from '../../../constant';

interface IProps {
  subCategoryList: ISubCategory[];
  onAddMore(): void;
}

const SubCategory = (props: IProps) => {
  const {onAddMore, subCategoryList = []} = props;
  const route = useRoute<RouteProp<RootStackParamList, 'AddCategory'>>();

  const {categoryId} = route.params;

  return (
    <View style={styles.container}>
      {subCategoryList?.map(item => {
        return (
          <View key={item?.id} style={styles.subItem}>
            <Text style={styles.subText}>{item?.name}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.subItem}
        activeOpacity={0.8}
        onPress={onAddMore}>
        <Icon name="plus" style={styles.subText} />
      </TouchableOpacity>
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
});
