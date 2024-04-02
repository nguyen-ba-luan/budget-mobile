import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatisticTransactionParamList} from './type';
import StatisticTransaction from '../screen/statistic-transaction';
import DateFilter from '../screen/date-filter';

export * from './type';

const Stack = createNativeStackNavigator<StatisticTransactionParamList>();

const StatisticTransactionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="StatisticTransaction"
        component={StatisticTransaction}
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
};

export default StatisticTransactionStack;
