import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {CategorySelector, LedgerSelector, useRootStore} from '../../../store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';
import {formatNumber} from '../../../util';

const Statistic = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AddTransaction'>>();
  const categoryId = route?.params?.categoryId;

  const category = useRootStore(
    CategorySelector.selectLedgerCategory(categoryId),
  );
  const costTotal = route?.params?.costTotal;

  const selectedLedger = useRootStore(LedgerSelector.selectSelectedLedger);

  const leftPrice = Number(category?.budget?.cost) - costTotal;

  const percentSpent = Number(
    (costTotal * 100) / category?.budget?.cost,
  ).toFixed(1);

  const percentLeft = Number(100 - Number(percentSpent)).toFixed(1);

  const isWaring = costTotal > category?.budget?.cost;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          {width: `${Number(percentSpent)}%`},
          isWaring && styles.progressWarning,
        ]}
      />
      <View>
        <Text style={styles.totalSpentText}>{`${
          selectedLedger?.currency?.symbol
        }${formatNumber(costTotal)}`}</Text>
        <Text style={styles.percentSpentText}>{`${percentSpent}% Spent`}</Text>
      </View>
      <View>
        <Text style={styles.totalSpentText}>{`${
          selectedLedger?.currency?.symbol
        }${formatNumber(leftPrice)}`}</Text>
        <Text style={styles.percentSpentText}>{`${percentLeft}% ${
          isWaring ? 'Exceeding' : 'Left'
        }`}</Text>
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
  progressWarning: {
    backgroundColor: 'tomato',
  },
});
