import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './home.stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatisticTransactionStack from './statistic-transaction.stack';
import {useRootStore, AuthSelector} from '../store';
import AuthStack from './auth.stack';
import Profile from '../screen/profile';

export * from './type';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  const logged = useRootStore(AuthSelector.selectLogged);

  return (
    <NavigationContainer>
      {logged ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen
            name="StatisticTransactionStack"
            component={StatisticTransactionStack}
          />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default AppNavigation;
