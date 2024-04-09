import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatisticTransactionParamList} from './type';
import StatisticTransaction from '../screen/statistic-transaction';
import DateFilter from '../screen/date-filter';
import TransactionDetail from '../screen/transaction-detail';

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
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
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
