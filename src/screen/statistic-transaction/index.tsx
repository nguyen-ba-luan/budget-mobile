import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, TransactionList} from './_components';

const StatisticTransaction = () => {
  return (
    <View style={styles.container}>
      <Header />
      <TransactionList />
    </View>
  );
};

export default StatisticTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
