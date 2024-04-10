import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './home.stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatisticTransactionStack from './statistic-transaction.stack';
import {useRootStore, AuthSelector} from '../store';
import AuthStack from './auth.stack';
import Profile from '../screen/profile';
import TabBarIcon from './tab-bar-icon';

export * from './type';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  const logged = useRootStore(AuthSelector.selectLogged);

  return (
    <NavigationContainer>
      {logged ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: tabBarProps => (
              <TabBarIcon {...tabBarProps} route={route} />
            ),
            tabBarActiveTintColor: 'slateblue',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '500',
            },
          })}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: 'Home',
            }}
          />
          <Tab.Screen
            name="StatisticTransactionStack"
            component={StatisticTransactionStack}
            options={{
              title: 'Transactions',
            }}
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
