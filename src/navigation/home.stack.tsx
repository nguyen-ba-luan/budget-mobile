import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/home';
import AddTransaction from '../screen/add-transaction';
import AddLedger from '../screen/add-ledger';
import AddCategory from '../screen/add-category';
import ChooseColor from '../screen/choose-color';
import AddBudget from '../screen/add-budget';
import DateFilter from '../screen/date-filter';
import ChooseIcon from '../screen/choose-icon';
import {RootStackParamList} from './type';

export * from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
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
          presentation: 'formSheet',
          gestureEnabled: false,
        }}
        name="ChooseIcon"
        component={ChooseIcon}
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
  );
}

export default HomeStack;
