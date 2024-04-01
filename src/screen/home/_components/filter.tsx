import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';

const Filter = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

  const onOpenDateFilter = useCallback(() => {
    navigation.navigate('DateFilter', {
      previousScreen: route?.name,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <Icon name="left" size={12} color={'slateblue'} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onOpenDateFilter}>
        <Text style={styles.headerText}>This Month</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Icon name="right" size={12} color={'slateblue'} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Filter);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
  },
});
