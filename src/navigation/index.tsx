import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/home';
import AddTransaction from '../screen/add-transaction';
import AddLedger from '../screen/add-ledger';
import AddCategory from '../screen/add-category';
import {IBudget, IFullLedgerCategory} from '../constant';
import ChooseColor from '../screen/choose-color';
import AddBudget from '../screen/add-budget';
import DateFilter from '../screen/date-filter';

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
        <Stack.Screen
          options={{
            presentation: 'formSheet',
            gestureEnabled: false,
          }}
          name="ChooseColor"
          component={ChooseColor}
        />
        <Stack.Screen
          options={{
            presentation: 'transparentModal',
          }}
          name="AddBudget"
          component={AddBudget}
        />
        <Stack.Screen
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
          name="DateFilter"
          component={DateFilter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;

export type RootStackParamList = {
  Home: undefined;
  AddLedger?: {
    ledgerId?: number;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
    color?: string;
    category?: IFullLedgerCategory;
    categoryId?: number;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
  };
  AddTransaction: {
    ledgerId: number;
    categoryId: number;
    costTotal: number;
  };
  AddCategory: {
    ledgerId?: number;
    category?: IFullLedgerCategory;
    previousScreen: string;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
    color?: string;
    budget?: IBudget;
    /** PARAMS FOR SET PARAMS FROM OTHER SCREEN */
  };
  ChooseColor: {
    color?: string;
    previousScreen: string;
  };
  AddBudget: {
    previousScreen: string;
    budget?: IBudget;
  };
  DateFilter: {
    previousScreen: string;
  };
};
