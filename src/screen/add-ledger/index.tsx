import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header} from './_components';

const AddLedger = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

export default AddLedger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
