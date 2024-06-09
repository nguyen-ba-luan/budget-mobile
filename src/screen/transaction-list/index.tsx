import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, Transactions} from './_components';

const TransactionList = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Transactions />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
