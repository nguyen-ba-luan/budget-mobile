import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {TransactionSelector, useRootStore} from '../../../store';
import {formatNumber, map} from '../../../util';

const TransactionList = () => {
  const transactionList = useRootStore(
    TransactionSelector.selectTransactionListForHome,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {map(transactionList, transaction => {
        return (
          <View key={transaction?.id}>
            <Text>{formatNumber(transaction?.cost)}</Text>
            <Text>{transaction?.time}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default memo(TransactionList);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
