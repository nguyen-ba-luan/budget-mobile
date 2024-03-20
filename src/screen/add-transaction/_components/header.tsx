import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {RootStoreSelector, useRootStore} from '../../../store';
import Icon from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';

const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddTransaction'>>();

  const {categoryId, ledgerId} = route.params;

  const selectedCategory = useRootStore(
    RootStoreSelector.selectLedgerCategory(ledgerId, categoryId),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={navigation.goBack}
        activeOpacity={0.8}>
        <Icon name={'close'} size={14} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.title}>{selectedCategory?.name || 'Category'}</Text>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    left: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
