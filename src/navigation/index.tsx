import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/home';
import AddTransaction from '../screen/add-transaction';
import AddLedger from '../screen/add-ledger';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
        <Stack.Screen
          options={{
            presentation: 'formSheet',
          }}
          name="AddLedger"
          component={AddLedger}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
