import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/home';
import AddTransaction from '../screen/add-transaction';
import AddLedger from '../screen/add-ledger';
import AddCategory from '../screen/add-category';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          options={{
            presentation: 'formSheet',
          }}
          name="AddTransaction"
          component={AddTransaction}
        />
        <Stack.Screen
          options={{
            presentation: 'formSheet',
          }}
          name="AddLedger"
          component={AddLedger}
        />
        <Stack.Screen
          options={{
            presentation: 'formSheet',
          }}
          name="AddCategory"
          component={AddCategory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;

export type RootStackParamList = {
  Home: undefined;
  AddLedger: {ledgerId?: number};
  AddTransaction: {ledgerId: number; categoryId: number};
  AddCategory: {ledgerId?: number; categoryId?: number};
};
