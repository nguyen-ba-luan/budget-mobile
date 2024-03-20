import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Amount, BottomBlock, Header, Statistic} from './_components';

const AddTransaction = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Amount />
      <Statistic />
      <BottomBlock />
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
