import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ParamListBase, RouteProp} from '@react-navigation/native';

interface IProps {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<ParamListBase>;
}

const TabBarIcon = ({color, focused, size, route}: IProps) => {
  let iconName: string = '';

  if (route.name === 'Home') {
    iconName = focused
      ? 'ios-information-circle'
      : 'ios-information-circle-outline';
  } else if (route.name === 'Settings') {
    iconName = focused ? 'ios-list' : 'ios-list-outline';
  }

  // You can return any component that you like here!
  return <Icon name={iconName} size={size} color={color} />;
  return (
    <View>
      <Text>TabBarIcon</Text>
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({});
