import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {RootStoreSelector, useRootStore} from '../../../store';

const Amount = () => {
  const selectedLedger = useRootStore(RootStoreSelector.selectSelectedLedger);
  const price = 50000000;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${
        selectedLedger?.currency?.symbol
      }${price.toLocaleString('vi')}`}</Text>
    </View>
  );
};

export default memo(Amount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
  },
});
