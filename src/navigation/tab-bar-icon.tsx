import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ParamListBase, RouteProp} from '@react-navigation/native';

interface IProps {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<ParamListBase>;
}

const TabBarIcon = ({color, focused, size, route}: IProps) => {
  let iconName: string = 'account';

  switch (route.name) {
    case 'HomeStack':
      iconName = focused ? 'store' : 'store-outline';
      break;
    case 'StatisticTransactionStack':
      iconName = focused ? 'bank-transfer' : 'bank-transfer';
      break;

    default:
      iconName = focused ? 'account' : 'account-outline';
      break;
  }

  return <Icon name={iconName} size={30} color={color} />;
};

export default memo(TabBarIcon);

const styles = StyleSheet.create({});
