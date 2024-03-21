import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {LedgerSelector, useRootStore} from '../../../store';

const Statistic = () => {
  const selectedLedger = useRootStore(LedgerSelector.selectSelectedLedger);
  const price = 931000;

  return (
    <View style={styles.container}>
      <View style={styles.progress} />
      <View>
        <Text style={styles.totalSpentText}>{`${
          selectedLedger?.currency?.symbol
        }${price.toLocaleString('vi')}`}</Text>
        <Text style={styles.percentSpentText}>{'45,6% Spent'}</Text>
      </View>
      <View>
        <Text style={styles.totalSpentText}>{`${
          selectedLedger?.currency?.symbol
        }${price.toLocaleString('vi')}`}</Text>
        <Text style={styles.percentSpentText}>{'45,6% Left'}</Text>
      </View>
    </View>
  );
};

export default memo(Statistic);

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3cb37147',
    paddingHorizontal: 15,
  },
  totalSpentText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  percentSpentText: {
    color: 'white',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '60%',
    backgroundColor: 'mediumseagreen',
  },
});
