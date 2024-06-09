import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {CategorySelector, useRootStore} from '../../../store';
import Icon from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';

const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddTransaction'>>();

  const {categoryId} = route.params;

  const selectedCategory = useRootStore(
    CategorySelector.selectLedgerCategory(categoryId),
  );

  const onTransactionList = useCallback(() => {
    navigation.navigate('TransactionList', {
      categoryId,
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={navigation.goBack}
        activeOpacity={0.8}>
        <Icon name={'close'} size={22} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.title}>{selectedCategory?.name || 'Category'}</Text>
      <TouchableOpacity
        style={styles.btnList}
        onPress={onTransactionList}
        activeOpacity={0.8}>
        <Icon name={'bars'} size={22} color={'mediumseagreen'} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    left: 10,
  },
  btnList: {
    position: 'absolute',
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});
