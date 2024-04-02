import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './home.stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatisticTransactionStack from './statistic-transaction.stack';

export * from './type';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen
          name="StatisticTransactionStack"
          component={StatisticTransactionStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
